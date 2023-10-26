<template>
    <div>
      <!-- Breadcrumb -->
      <Breadcrumb breadcrumb="GetIDContractor" />
  
      <div class="mt-8">
        <h4 class="text-gray-600">Get Contractor</h4>
  
        <div class="form-row">
          <div class="mt-4">
            <label for="getAPI">Get Contractor ID: </label><br><br>
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
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clip-rule="evenodd"
                  >
                  </path>
                </svg>
                <span class="mx-1">Refresh</span>
              </button>
              </div>
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
                        Name
                      </th>
                      <th
                        class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                      >
                        Description
                      </th>
                      <th
                        class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                      >
                        Address
                      </th>
                      <th
                        class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                      >
                        Logo Path
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                          v-for="(item, index) in apiData"
                          :key="index"
                          class="hover:bg-gray-200"
                    >
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ item.id }}
                      </td>
                      <td class="px-6 py-4 text-gray-500 border-b">
                        {{ item.name }}
                      </td>
                      <td class="px-6 py-4 text-gray-500 border-b">
                        {{ item.description }}
                      </td>
                      <td class="px-6 py-4 text-gray-500 border-b">
                        {{ item.address }}
                      </td>
                      <td class="px-6 py-4 text-gray-500 border-b">
                        {{ item.logo_path }}
                      </td>
                      <td class="px-6 py-4 text-gray-500 border-b">
                        {{ item.created_at }}
                      </td>
                      <td class="px-6 py-4 text-gray-500 border-b">
                        {{ item.updated_at }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import Breadcrumb from '../partials/Breadcrumb.vue'
  
  interface GetIDContractor {
    id: string; 
    name: string;
    description: string;
    address: string;
    logo_path: string;
    created_at: Date; // Assuming these are dates
    updated_at: Date;
  }
  
  const contractorId = ref(''); // Store user input ID
  const apiData = ref<GetIDContractor[]>([]);
  
  async function fetchData() {
    try {
      const id = contractorId.value; // Get the ID from user input
      const url = `http://keyman-env.eba-dhwuuaiv.us-east-1.elasticbeanstalk.com/api/contractors/${id}`;
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
        apiData.value = data.data; // Update the data
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      apiData.value = []; // Clear data in case of an error
    }
  }

  function refreshPage() {
    // Reload the page when the "Refresh" button is clicked
    location.reload();
  }
  </script>
  