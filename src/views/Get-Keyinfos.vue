<template>
    <div>
      <!-- Breadcrumb -->
      <Breadcrumb breadcrumb="Keyinfos" />
  
      <div class="mt-8">
        <h4 class="text-gray-600">Key Information</h4>
  
        <!-- Fetch Data Button -->
        <div class="form-row">
          <div class="mt-4">
            <label for="getAPI">GET API Key Information: </label><br><br>
            <div class="flex space-x-2">
              <button @click="fetchData" class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                Fetch Data
              </button>
              <button @click="refreshPage" class="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                <svg
                  class="w-5 h-5 mx-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.610 5.002 5.002 0 009.717 1.276 1 1 0 11-1.885.666 7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clip-rule="evenodd"
                  >
                  </path>
                </svg>
                <span class="mx-1">Refresh</span>
              </button>
            </div>
          </div>
        </div>
  
        <!-- Contractor Data Table -->
        <div class="mt-6">
          <div
                class="px-4 py-4 overflow-x-auto bg-white rounded-md whitespace-nowrap"
                style="max-height: 400px; overflow-y: auto;"
              >
            <table class="w-full text-left border-collapse">
              <thead class="border-b">
                <tr>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    ID
                  </th>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    UUID
                  </th>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    Key Photo Path
                  </th>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    Description
                  </th>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    Status
                  </th>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    User ID
                  </th>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    Property ID
                  </th>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    Created At
                  </th>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    Updated At
                  </th>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    Update
                  </th>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item) in apiData" :key="item.id" class="hover:bg-gray-200">
                  <td class="px-6 py-4 text-lg text-gray-700 border-b">{{ item.id }}</td>
                  <td class="px-6 py-4 text-gray-500 border-b">{{ item.uuid }}</td>
                  <td class="px-6 py-4 text-gray-500 border-b">{{ item.key_photo_path }}</td>
                  <td class="px-6 py-4 text-gray-500 border-b">{{ item.description }}</td>
                  <td class="px-6 py-4 text-gray-500 border-b">{{ item.status }}</td>
                  <td class="px-6 py-4 text-gray-500 border-b">{{ item.user_id }}</td>
                  <td class="px-6 py-4 text-gray-500 border-b">{{ item.property_id }}</td>
                  <td class="px-6 py-4 text-gray-500 border-b">{{ item.created_at }}</td>
                  <td class="px-6 py-4 text-gray-500 border-b">{{ item.updated_at }}</td>
                  <td class="px-6 py-4 text-gray-500 border-b">
                    <button @click="openModal(item)">
                      <span class="text-yellow-500 flex justify-center">
                          <a href="#" class="mx-2 px-2 rounded-md"
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-5 w-5 text-green-700"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                              />
                              <path
                                fill-rule="evenodd"
                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </a>
                      </span>
                    </button>
                    </td>
                  <td class="px-6 py-4 text-gray-500 border-b">
                     <!-- Delete Button -->
                      <button @click="deleteKeyinfos(updateFormData.id)" class="mx-2 px-2 rounded-md">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 text-red-700"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                        </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
         <!-- Update Contractor Modal -->
        <div
          :class="`modal ${
            !isUpdateModalVisible && 'opacity-0 pointer-events-none'
          } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
        >
  
          <div
            @click="closeModal"
            class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
          ></div>
  
          <div
            class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
          >
            <div
              class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close"
            >
              <svg
                class="text-white fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
              <span class="text-sm">(Esc)</span>
            </div>
  
            <!-- Modal Content -->
            <div class="px-6 py-4 text-left modal-content">
              <!-- Title -->
              <div class="flex items-center justify-between pb-3">
                <p class="text-2xl font-bold">Update Keyinfos</p>
                <div class="z-50 cursor-pointer modal-close" @click="closeModal">
                  <svg
                    class="text-black fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path
                      d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                    />
                  </svg>
                </div>
              </div>
  
                  <!-- Update Contractor Form -->
              <form @submit.prevent="submitUpdate">
                <div class="form-row">
                  <label for="updateDescription">Description:</label><br>
                  <input v-model="updateFormData.description" id="description" name="description" type="text" class="px-4 py-2 border rounded-md" required><br>
  
                  <label for="updateStatus">Status:</label><br>
                  <select v-model="updateFormData.status" id="status" name="status" class="px-4 py-2 border rounded-md" required>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                  </select><br>

                  <label for="updateProperty">Property:</label><br>
                  <input v-model="updateFormData.property_id" id="property_id" name="property_id" type="text" class="px-4 py-2 border rounded-md" required><br>
  
                  <label for="updateLogo">Key Photo Path:</label><br>
                  <input @change="onFileChange" id="logo_path" name="logo_path" type="file" accept=".jpg, .jpeg, .png" class="px-4 py-2 border rounded-md" required><br><br>
  
                  <button type="submit" class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover-bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import Breadcrumb from '../partials/Breadcrumb.vue';
  
  // Define the Contractor interface
  interface Keyinfos {
    id: string;
    uuid: string;
    key_photo_path: string;
    description: string;
    status: string;
    user_id: string;
    property_id: string;
    created_at: Date;
    updated_at: Date;
  }
  
  // Create a ref for the API data
  const apiData = ref<Keyinfos[]>([]);
  
    const updateFormData = ref<Keyinfos>({
    id: '',
    uuid: '',
    key_photo_path: '',
    description: '',
    status: "available",
    user_id: '',
    property_id: '',
    created_at: new Date(),
    updated_at: new Date()
  });
  
  // Function to fetch data from the API
  async function fetchData() {
    try {
      const url = "http://keyman-env.eba-dhwuuaiv.us-east-1.elasticbeanstalk.com/api/keyinfos";
      const headers = {
        "Authorization": "Bearer 17|jnWPdWo8JoCK9EJZc2fLp3rmYYRBUtyLIyt301s6",
        "Content-Type": "application/json",
        "Accept": "application/json",
      };
  
      const response = await fetch(url, {
        method: "GET",
        headers,
      });
  
      if (response.ok) {
        const data = await response.json();
        apiData.value = data.data;
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      apiData.value = [];
    }
  }
  
  // Function to refresh the page
  function refreshPage() {
    location.reload();
  }
  
  // Function to handle file change for the logo in the update form
  function onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const logoFile = inputElement.files[0];
      updateFormData.value.key_photo_path = URL.createObjectURL(logoFile);
    }
  }
  
  // Function to update the contractor information
  async function submitUpdate() {
    try {
      const url = `http://keyman-env.eba-dhwuuaiv.us-east-1.elasticbeanstalk.com/api/contractors/1`;
      const headers = {
        "Authorization": "Bearer 17|jnWPdWo8JoCK9EJZc2fLp3rmYYRBUtyLIyt301s6",
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
      };
  
      const body = new FormData();
      body.append('description', updateFormData.value.description);
      body.append('status', updateFormData.value.status);
      body.append('property_id', updateFormData.value.property_id);
      if (updateFormData.value.key_photo_path) {
        const logoFile = await fetch(updateFormData.value.key_photo_path).then(response => response.blob());
        body.append('logo_path', logoFile);
      }
  
      const response = await fetch(url.toString(), {
        method: "PUT",
        headers,
        body,
      });
  
     
      if (response.ok) {
        console.log('Keyinfos updated successfully');
        updateFormData.value.description = '';
        updateFormData.value.status = '';
        updateFormData.value.property_id = '';
        updateFormData.value.key_photo_path = '';
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Create a ref for the modal visibility
  const isUpdateModalVisible = ref(false);
  
  // Function to open the update contractor modal
  const openModal = (keyinfos: Keyinfos) => {
    isUpdateModalVisible.value = true;
    updateFormData.value.id = keyinfos.id;
    updateFormData.value.description = keyinfos.description;
    updateFormData.value.status = keyinfos.status;
    updateFormData.value.property_id = keyinfos.property_id;
    updateFormData.value.key_photo_path = keyinfos.key_photo_path;
  };
  
  // Function to close the update contractor modal
  const closeModal = () => {
    isUpdateModalVisible.value = false;
  };
  
  
  // Function to delete the selected contractor
  function deleteKeyinfos(id: string) {
    if (confirm('Are you sure you want to delete this keyinfos?')) {
      // Confirm deletion and call the delete function
      doDelete(id);
    }
  }
  
  // Function to send a DELETE request to the API
  async function doDelete(id: string) {
    try {
      const url = `http://keyman-env.eba-dhwuuaiv.us-east-1.elasticbeanstalk.com/api/keyinfos/${id}`;
      const headers = {
        "Authorization": "Bearer 17|jnWPdWo8JoCK9EJZc2fLp3rmYYRBUtyLIyt301s6",
        "Content-Type": "application/json",
        "Accept": "application/json",
      };
  
      const response = await fetch(url, {
        method: "DELETE",
        headers,
      });
  
      if (response.ok) {
        console.log(`Keyinfos with ID ${id} deleted successfully`);
        // Close the modal after deletion
        closeModal();
        // You may want to update your data by calling fetchData() after deleting.
        fetchData();
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  </script>
  
  <style>
  .modal {
    transition: opacity 0.25s ease;
  }
  </style>