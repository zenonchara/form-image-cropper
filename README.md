# Image cropper React component

## Usage

Copy the imageCropper.js component and associated css to your environment. You can then add an imageCropper to any page by adding the following to your react views:

`
  <ImageCropper
    base64="...",
    metadata={},
    transformationData={}
    id="input-file"
    mode="avatar"
    onChange={onImageChange}
  />

`

see src/app.js for usage example.

The form can then be submitted through typical form submit processes, or more smartly using react form controls.

If you do a form submit following the pattern in the example, you'd be sending to the server 4 pieces of information for every file uploader you use:

* the source image as image data
* the cropped image as a base64 encoded string
* the source image metadata
* the cropper transformation data, in case you want to reload the cropper from the server


### Component Props

**base64**: The encoded string of the image
**metadata**: An object containing image size, name and file type. useful for client side form validation
**transformationData**: All properties relating to cropping and adjusting the source image
**id**: used to generate formData names and make the input instance unique
**mode**: set to "avatar" to fix the aspect ration to a square and force the interface to a circle
**onChange**: a listener function to fire every time the user changes the image


## Demo
1. Have Node and NPM installed, ideally with version at least 10
2. Have yarn installed
3. Install dependencies `yarn`
4. launch the dev server `yarn run start`. It should open a browser at localhost:8080 or next best
5. You should see a blank page with two inputs. one for avatar mode and one for free mode
