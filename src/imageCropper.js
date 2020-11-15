import React from "react";
import Cropper from "react-cropper";

import cropIcon from "assets/crop.svg";
import cancelIcon from "assets/times.svg";
import saveIcon from "assets/check.svg";

export default class App extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        isEditing: false,
        cropper: null,
      };

    }

    handleChangeImage(evt) {
      const reader = new FileReader();
      const file = evt.target.files[0];
      const self = this;
      reader.onload = function (upload) {
        const metadata = {
          name: file.name,
          size: file.size,
          type: file.type,
        };
        self.props.onChange({
          metadata,
          transformationData: self.getTransformData(self.state.cropper),
          base64: upload.target.result
        });
        self.setState({
          ...self.state,
          rawImageBase64: upload.target.result
        });
        if(self.props.mode === "avatar") {
          self.enableEdit();
        }
      };
      reader.readAsDataURL(file);
    }

    setCropper(cropper) {
      this.setState({
        ...this.state,
        cropper
      });
    }

    enableEdit() {
      this.setState({
        ...this.state,
        isEditing: true
      });
    }

    cancelEdit() {
      this.setState({
        ...this.state,
        isEditing: false
      });
    }

    reset() {
      this.props.onChange({
        metadata: null,
        transformationData: "",
        base64: "",
      });
      document.getElementById(`input-file-${this.props.id}`).value = null;
    }

    getTransformData(cropper) {
      console.log(cropper)
      if (cropper) {
        var metadata = cropper.getImageData();
        var canvasData = cropper.getCanvasData();
        var transformationData = cropper.getCropBoxData();
        var base64 = cropper.getData();

        return {
          image: { width: metadata.width, height: metadata.height, left: metadata.left, top: metadata.top }, canvas: { left: canvasData.left, top: canvasData.top },
          canvas: { left: canvasData.left, top: canvasData.top },
          cropBox: { width: transformationData.width, height: transformationData.height, left: transformationData.left, top: transformationData.top },
          base64: { x: base64.x, y: base64.y, width: base64.width, height: base64.height }
        };
      } else {
        return null
      }
    }

    setCropData() {
      const cropper = this.state.cropper;
      this.props.onChange({
        metadata: this.props.metadata,
        base64: cropper.getCroppedCanvas().toDataURL(this.props.metadata.type),
        transformationData: this.getTransformData(cropper),
      });
      this.cancelEdit();
    };

    render() {

      const {
        cropper,
        rawImageBase64,
        isEditing,
      } = this.state;

      const {
        metadata,
        base64,
        transformationData,
        mode,
      } = this.props;

      const showPreview = base64 && !isEditing;

      const cropBoxData = transformationData ? transformationData.base64 : null;

      console.log(this.state, this.props)

      let wrapperClasses = ["cropper-wrapper"];
      wrapperClasses.push(`cropper-mode-${mode}`);
      if (isEditing) {
        wrapperClasses.push("cropper-editing");
      }
      if (showPreview) {
        wrapperClasses.push("cropper-preview");
      }


      return (
        <>

          <div className={wrapperClasses.join(" ")}>

            <div className="custom-file custom-file-mp">
              <input
                name={`SourceImage_${this.props.id}`}
                id={`input-file-${this.props.id}`}
                type="file"
                onChange={this.handleChangeImage.bind(this)}
                encType="multipart/form-data"
                className="custom-file-input"
              />
              <div className="custom-file-label">
                {metadata ? (
                  <span>{metadata.name}</span>
                ): (
                  <span className="text-muted">Choose file</span>
                )}

              </div>
              { showPreview ? (
                <button title="Clear" type="button" className="clear-file close" onClick={this.reset.bind(this)}>
                  &times;
                </button>
              ): ""}
            </div>

            { isEditing ? (
              <div className="crop-edit">
                <Cropper
                  style={{ height: 400, width: "100%" }}
                  initialAspectRatio={1}
                  aspectRatio={mode === "avatar" ? 1 : NaN}
                  src={rawImageBase64}
                  data={cropBoxData}
                  viewMode={1}
                  guides={true}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  zoomable={false}
                  responsive={true}
                  rotatable={false}
                  scalable={false}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  onInitialized={(instance) => {
                    console.log(this.state);
                      this.setCropper(instance);
                  }}
                />
                <div className="crop-edit-toolbar">
                  <button className="crop-button crop-btn-cancel btn" type="button" onClick={this.cancelEdit.bind(this)}>
                    <img src={cancelIcon} />
                  </button>
                  <button  className="crop-button crop-btn-save btn" type="button" onClick={this.setCropData.bind(this)}>
                    <img src={saveIcon} />
                  </button>
                  </div>
              </div>
            ):"" }

            { showPreview ? (
              <div className="file-image-preview">
                <img
                  src={base64}
                  alt="preview"
                />
                <button className="crop-button crop-btn-edit btn" type="button" title="Crop image" onClick={this.enableEdit.bind(this)}>
                  <img src={cropIcon} />
                </button>
              </div>
            ):"" }

          </div>


        </>
      );
    }
  };
