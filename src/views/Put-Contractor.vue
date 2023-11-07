<template>
    <div>
      <!-- Breadcrumb -->
      <Breadcrumb breadcrumb="PutContractor" />
  
      <div class="mt-8">
        <h4 class="text-gray-600">PUT Contractor</h4>
        <form id="contractorForm" @submit.prevent="submitForm">
          <div class="form-row">
            <div class="mt-4">
              <label for="id">Contractor ID: </label>
              <input type="text" class="px-4 py-2 border rounded-md" id="id" name="id" required v-model="id" />
            </div>
            <div class="mt-4">
              <label for="name">Name: </label>
              <input type="text" class="px-4 py-2 border rounded-md" id="name" name="name" required v-model="name" />
            </div>
          </div>
          <div class="form-row">
            <div class="mt-4">
              <label for="description">Description: </label>
              <input type="text" class="px-4 py-2 border rounded-md" id="description" name="description" required v-model="description" />
            </div>
          </div>
          <div class="form-row">
            <div class="mt-4">
              <label for="address">Address: </label>
              <input type="text" class="px-4 py-2 border rounded-md" id="address" name="address" required v-model="address" />
            </div>
          </div>
          <div class="form-row">
            <div class="mt-4">
              <input type="file" class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500" id="logo_path" name="logo_path" />
            </div>
          </div>
          <div class="form-row">
            <div class="mt-4">
              <button type="submit" class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Breadcrumb from '../partials/Breadcrumb.vue';

  const id = ref('');
  const name = ref('');
  const description = ref('');
  const address = ref('');
  
  
  
  const submitForm = () => {
    const url = 'https://www.prototypeapp.online/api/contractors/2';
    const headers = {
      'Authorization': 'Bearer 17|jnWPdWo8JoCK9EJZc2fLp3rmYYRBUtyLIyt301s6',
      'Accept': 'application/json',
    };
  
    const formData = new FormData(document.getElementById('contractorForm'));
  
    fetch(url, {
      method: 'PUT',
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
  </script>
  