import React from "react";

import ImageCropper from "./imageCropper";

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      logo: {
        base64: "",
        metadata: "",
        transformationData: "",
      },
      avatar: {
        base64: "",
        metadata: "",
        transformationData: "",
      }
    };

  }

  onImageChange(stateVar, newData) {
    const newState = this.state;
    newState[stateVar] = newData;
    this.setState(newState);
  }


  render() {

    return (
      <>
        <div className="container py-5 px-5">

          <form
            action="/"
            method="post"
            noValidate="novalidate"
          >

            <div className="form-group">
              <label htmlFor="LogoFile">Company logo</label>

              <ImageCropper
                {...this.state.logo}
                id="input-file"
                onChange={this.onImageChange.bind(this, "logo")}
              />

              <input type="hidden" value={this.state.logo.base64} name="LogoBase64CroppedImage" />
              <input type="hidden" value={JSON.stringify(this.state.logo.transformationData)} name="LogoTransformationData" />
              <input type="hidden" value={JSON.stringify(this.state.logo.metadata)} name="LogoImageMetaData" />

            </div>

            <div className="form-group">
              <label htmlFor="AvatarFile">Avatar</label>

              <ImageCropper
                {...this.state.avatar}
                id="AvatarFile"
                mode="avatar"
                onChange={this.onImageChange.bind(this, "avatar")}
              />

              <input type="hidden" value={this.state.avatar.base64} name="AvatarBase64CroppedImage" />
              <input type="hidden" value={JSON.stringify(this.state.avatar.transformationData)} name="AvatarTransformationData" />
              <input type="hidden" value={JSON.stringify(this.state.avatar.metadata)} name="AvatarImageMetaData" />

            </div>


          </form>

          <pre>
            { JSON.stringify(this.state.logo.metadata, null, 2) }
            <br />
            { JSON.stringify(this.state.logo.transformationData, null, 2) }
          </pre>
          <hr />
          <pre>
            { JSON.stringify(this.state.avatar.metadata, null, 2) }
            <br />
            { JSON.stringify(this.state.avatar.transformationData, null, 2) }
          </pre>

        </div>
      </>
    );
  }
};
