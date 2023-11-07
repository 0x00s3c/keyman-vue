<template>
    <div>
      <!-- Breadcrumb -->
      <Breadcrumb breadcrumb="PostContractorKeypickups" />
  
      <div class="mt-8">
        <h4 class="text-gray-600">POST Contractor Key Pickup</h4>
        <form id="pickupForm">
          <div class="form-row">
            <div class="mt-4">
              <label for="purpose">Purpose: </label>
              <input type="text" class="px-4 py-2 border rounded-md" id="purpose" name="purpose" required v-model="purpose" />
            </div>
            <div class="mt-4">
              <label for="status">Status: </label>
              <select class="px-4 py-2 border rounded-md" id="status" name="status" required v-model="status">
                <option value="returned">Returned</option>
                <option value="unreturned">Unreturned</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="mt-4">
              <label for="keyinfo_id">Keyinfo ID: </label>
              <input type="text" class="px-4 py-2 border rounded-md" id="keyinfo_id" name="keyinfo_id" required v-model="keyinfo_id" />
            </div>
          </div>
          <div class="form-row">
            <div class="mt-4">
              <label for="qrScanner">QR Code Scanner: </label>
              <!-- Properly bind the video element -->
              <video ref="video" autoplay playsinline style="max-width: 350px;"></video>
            </div>
          </div>
          <div class="form-row">
            <div class="mt-6">
              <button type="button" class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500" @click="startScanner">Start Scanner</button> &nbsp;
              <button type="button" class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500" @click="stopScanner">Stop Scanner</button> &nbsp;
              <button type="button" class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500" @click="captureImage">Capture Image</button> &nbsp;
            </div>
          </div>
          <div class="form-row">
            <div class="mt-6">
              <!-- Image preview -->
              <img id="capturedImage" src="" alt="Captured Image" style="max-width: 100%; max-width: 350px; display: none;" />
              <!-- Include a hidden input field to store the captured image data URL -->
              <input type="hidden" id="pickup_photo_path_upload" name="pickup_photo_path_upload" v-model="pickup_photo_path_upload" />
              <!-- Download link for the captured image -->
              <a id="downloadImageLink" class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500" style="display: none;" download="pickup_image.jpeg">Download Image</a><br />
              <!-- Include a hidden input field to store the captured image data URL -->
              <input type="file" class="px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500" id="pickup_photo_path" name="pickup_photo_path" />
            </div>
            <div class="mt-4">
              <button type="button" class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500" @click="submitForm">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Breadcrumb from '../partials/Breadcrumb.vue'
  import {onMounted, onBeforeUnmount } from 'vue';
  import jsQR from 'jsqr';
  
  const purpose = ref('');
  const status = ref('returned');
  const keyinfo_id = ref('');
  const pickup_photo_path_upload = ref('');
  const video = ref(null);
  let scannerInterval;
  let scanning = false;
  
  // Function to set up video stream
  const setupVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.value.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };
  
  // Lifecycle hook to start the video stream when the component is mounted
  onMounted(() => {
    setupVideo();
  });
  
  // Lifecycle hook to clean up when the component is unmounted
  onBeforeUnmount(() => {
    if (video.value.srcObject) {
      const tracks = video.value.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  });
  
  const startScanner = () => {
    scanning = true;
    scannerInterval = setInterval(scanQRCode, 1000);
  };
  
  const stopScanner = () => {
    scanning = false;
    clearInterval(scannerInterval);
  };
  
  const captureImage = () => {
    if (scanning) {
      const canvas = document.createElement('canvas');
      canvas.width = video.value.videoWidth;
      canvas.height = video.value.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video.value, 0, 0, canvas.width, canvas.height);
  
      canvas.toBlob(function (blob) {
        if (blob) {
          const imageUrl = URL.createObjectURL(blob);
  
          const capturedImage = document.getElementById('capturedImage');
          capturedImage.src = imageUrl;
          capturedImage.style.display = 'block';
  
          // Use .value to update the ref
          pickup_photo_path_upload.value = imageUrl;
  
          const downloadImageLink = document.getElementById('downloadImageLink');
          downloadImageLink.href = imageUrl;
          downloadImageLink.style.display = 'block';
  
          const link = document.createElement('a');
          link.href = imageUrl;
          link.download = 'pickup_image.jpeg';
          link.click();
  
          const uploadInput = document.createElement('input');
          uploadInput.type = 'file';
          uploadInput.value = imageUrl;
          uploadInput.name = 'pickup_photo_path_upload';
          uploadInput.style.display = 'none';
          // Append the uploadInput to the appropriate form element
          document.getElementById('pickupForm').appendChild(uploadInput);
        }
      }, 'image/jpeg');
    }
  };
  
  const submitForm = () => {
    const url = 'https://www.prototypeapp.online/api/contractors/2/keypickups';
    const headers = {
      'Authorization': 'Bearer 17|jnWPdWo8JoCK9EJZc2fLp3rmYYRBUtyLIyt301s6',
      'Accept': 'application/json',
    };
  
    const formData = new FormData(document.getElementById('pickupForm'));
  
    fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const scanQRCode = () => {
    if (scanning) {
      const canvas = document.createElement('canvas');
      canvas.width = video.value.videoWidth;
      canvas.height = video.value.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video.value, 0, 0, canvas.width, canvas.height);
  
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  
      // Make sure to import 'jsQR' library
      const code = jsQR(imageData.data, imageData.width, imageData.height);
  
      if (code) {
        keyinfo_id.value = code.data;
      }
    }
  };
  </script>
  