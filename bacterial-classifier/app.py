import streamlit as st
from PIL import Image
import os
import sys
import tempfile
import pandas as pd

# Add the parent directory to sys.path to import bacsense_v2_package
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from bacsense_v2_package.inference import BacSense

# Precaution dictionary
PRECAUTIONS = {
    "Escherichia coli": "Indicator of fecal contamination. \n\n**Precautions/Actions:** Boil water immediately before consumption. Source trace to find sewage leaks. Do not use for washing open wounds.",
    "Pseudomonas aeruginosa": "Opportunistic pathogen resistant to many sanitizers. \n\n**Precautions/Actions:** Ensure water chlorination levels are adequate. Can cause severe infections in immunocompromised individuals. Avoid contact with eyes or ears.",
    "Enterococcus faecalis": "Indicates prolonged fecal contamination. Very resilient. \n\n**Precautions/Actions:** Shock chlorinate the water system. Discontinue use for drinking until negative tests are returned.",
    "Clostridium perfringens": "Spore-forming bacteria, highly resistant to standard disinfection. \n\n**Precautions/Actions:** Indicates remote or past fecal contamination. UV filtration or extreme heat treatment may be required.",
    "Listeria monocytogenes": "Dangerous to pregnant women and immunocompromised individuals. \n\n**Precautions/Actions:** Do not use water for food preparation or drinking. Pasteurization/boiling is required."
}

# Set page config
st.set_page_config(
    page_title="BacSense v2 Dashboard",
    page_icon="🦠",
    layout="wide"
)

# Initialize classifier
@st.cache_resource
def get_classifier():
    model_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'bacsense_v2_package'))
    model = BacSense(model_dir=model_dir)
    model.warmup()
    return model

try:
    classifier = get_classifier()
except Exception as e:
    st.error(f"Error loading model: {e}")
    st.stop()

# Dialog function for detailed view
# Fallback for older Streamlit versions that lack st.dialog
def render_details(item):
    st.image(item["Image"], use_column_width=True)
    st.markdown(f"### Predicted: **{item['Predicted Class']}**")
    
    colA, colB = st.columns(2)
    colA.metric("Confidence", f"{item['Confidence (%)']}%")
    colB.metric("Risk Level", item['Risk'])
    
    st.markdown("""---""")
    st.markdown("**Bacterial Summary:**")
    st.write(f"- **Gram Stain:** {item['Gram Stain']}")
    st.write(f"- **Shape:** {item['Shape']}")
    
    if item['Routed to Specialist']:
        st.info(f"Ambiguous morphology triggered the Specialist SVM. Accepted: {'✅' if item['Specialist Accepted'] else '❌'}")

    st.markdown("""---""")
    st.markdown("**Precautions:**")
    precaution_text = PRECAUTIONS.get(item['Predicted Class'], "No specific precautions available. Standard water safety protocols suggest boiling before consumption.")
    st.warning(precaution_text)
    
    if st.button("Close Summary", key="close_summary_btn"):
        st.session_state.selected_item = None
        st.rerun()

# Main UI
st.title("🦠 BacSense v2 Analytics Dashboard")
st.markdown("""
Welcome to the BacSense v2 Dashboard. This cascaded hybrid classifier uses **VGG16 Transfer Learning** 
combined with **Hand-Crafted Feature Engineering** and an **RBF-SVM Specialist** to disambiguate waterborne pathogens.
You can safely upload **up to 60 images** at once.
""")

# Sidebar for info
with st.sidebar:
    st.header("Supported Species")
    st.markdown("""
    - *Clostridium perfringens*
    - *Enterococcus faecalis*
    - *Escherichia coli*
    - *Listeria monocytogenes*
    - *Pseudomonas aeruginosa*
    """)
    st.markdown("---")
    st.caption("BacSense v2 Cascaded Model")
    st.caption("Overall Accuracy: 95.65%")
    st.caption("Specialist AUC: 0.9863")

st.subheader("Batch Upload (Multiple Images)")
uploaded_files = st.file_uploader("Upload microscopic bacterial images...", type=["jpg", "jpeg", "png"], accept_multiple_files=True)

if "selected_item" not in st.session_state:
    st.session_state.selected_item = None

if uploaded_files:
    # Check if we are viewing details
    if st.session_state.selected_item is not None:
        render_details(st.session_state.selected_item)
    else:
        # Filter to 60 images to prevent abuse if needed, or just process however many there are
        uploaded_files = list(uploaded_files)[:100] # Safe upper limit
        results = []
        
        # Progress container
        progress_container = st.container()
        with progress_container:
            st.write(f"Processing {len(uploaded_files)} images...")
            progress_bar = st.progress(0)
            status_text = st.empty()
        
        for i, uploaded_file in enumerate(uploaded_files):
            status_text.text(f"Analyzing [{i+1}/{len(uploaded_files)}]: {uploaded_file.name}...")
            
            # Load image
            image = Image.open(uploaded_file)
            
            # Save temp file
            fd, temp_path = tempfile.mkstemp(suffix=".png")
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            with os.fdopen(fd, 'wb') as f:
                image.save(f, format="PNG")
            
            try:
                # Classify using BacSense cascaded model
                prediction = classifier.predict(temp_path)
                
                confidence_pct = prediction['confidence'] * 100 if prediction['confidence'] <= 1.0 else prediction['confidence']
                results.append({
                    "Filename": uploaded_file.name,
                    "Predicted Class": prediction['prediction'],
                    "Confidence (%)": round(confidence_pct, 2),
                    "Gram Stain": prediction.get('gram', 'Unknown'),
                    "Shape": prediction.get('shape', 'Unknown'),
                    "Risk": prediction.get('risk', 'Unknown'),
                    "Routed to Specialist": prediction.get('routed_to_specialist', False),
                    "Specialist Accepted": prediction.get('specialist_accepted', False),
                    "Image": image
                })
                
            except Exception as e:
                st.error(f"Error processing {uploaded_file.name}: {e}")
            finally:
                # Cleanup
                if os.path.exists(temp_path):
                    os.remove(temp_path)
            
            # Update progress
            progress_bar.progress((i + 1) / len(uploaded_files))
        
        status_text.text("Batch Processing Complete!")
        
        if results:
            df = pd.DataFrame(results)
            
            # 1. Top Level Metrics
            st.markdown("---")
            st.subheader("📊 Batch Analytics Summary")
            col1, col2, col3, col4 = st.columns(4)
            
            total_images = len(results)
            high_risk = len(df[df["Risk"] == "High"])
            routed_spec = len(df[df["Routed to Specialist"] == True])
            avg_confidence = df["Confidence (%)"].mean()
            
            col1.metric("Total Images", total_images)
            col2.metric("High Target Risk", high_risk)
            col3.metric("Routed to Specialist", routed_spec, help="Ambiguous cases handled by the 683-dim Specialist SVM")
            col4.metric("Avg Confidence", f"{avg_confidence:.1f}%")

            # 2. Charts
            st.markdown("<br>", unsafe_allow_html=True)
            col_chart1, col_chart2 = st.columns(2)
            with col_chart1:
                st.markdown("**Species Distribution**")
                class_counts = df["Predicted Class"].value_counts().reset_index()
                class_counts.columns = ["Species", "Count"]
                st.bar_chart(class_counts.set_index("Species"))
                
            with col_chart2:
                st.markdown("**Gram Stain Breakdown**")
                gram_counts = df["Gram Stain"].value_counts()
                st.bar_chart(gram_counts)

            # 3. Data Table
            st.markdown("---")
            st.subheader("📋 Detailed Results Table")
            st.dataframe(df.drop(columns=["Image"]), use_container_width=True)
            
            # 4. Filterable Image Gallery
            st.markdown("---")
            st.subheader("🖼️ Processed Image Gallery")
            st.caption("Click on 'View Summary' underneath any image to view brief details and precautions for the detected pathogen.")
            
            filter_class = st.selectbox("Filter gallery by predicted species:", ["All"] + sorted(df["Predicted Class"].unique().tolist()))
            
            filtered_results = results if filter_class == "All" else [r for r in results if r["Predicted Class"] == filter_class]
            
            # Display images in a grid
            cols_per_row = 4
            for i in range(0, len(filtered_results), cols_per_row):
                cols = st.columns(cols_per_row)
                for j in range(cols_per_row):
                    if i + j < len(filtered_results):
                        item = filtered_results[i + j]
                        with cols[j]:
                            st.image(item["Image"], use_column_width=True)
                            st.markdown(f"**{item['Predicted Class']}**")
                            
                            # Add pills for details
                            det_col1, det_col2 = st.columns(2)
                            det_col1.markdown(f"<small>{item['Confidence (%)']}% Conf</small>", unsafe_allow_html=True)
                            if item["Routed to Specialist"]:
                                det_col2.markdown(f"<small>Specialist: {'✅' if item['Specialist Accepted'] else '❌'}</small>", unsafe_allow_html=True)
                            
                            if st.button("View Summary", key=f"details_btn_{i}_{j}"):
                                st.session_state.selected_item = item
                                st.rerun()

else:
    st.info("Please upload one or more images (up to 60) to start the batch analysis.")

