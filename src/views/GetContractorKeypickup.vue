<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb breadcrumb="GetContractorKeypickups" />

    <div class="mt-8">
      <h4 class="text-gray-600">Get Contractor Keypickups</h4>

      <div class="form-row">
        <div class="mt-4">
          <div class="flex space-x-2">
          <label for="getAPI">Get Contractor ID: </label> &nbsp;
          <input v-model="contractorId" type="text" class="px-4 py-2 border rounded-md" />
          <button @click="fetchDataByContractorId" class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
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
                      UUID
                    </th>
                    <th
                      class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                    >
                      Pickup Photo Path
                    </th>
                    <th
                      class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                    >
                      Purpose
                    </th>
                    <th
                      class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                    >
                      Status
                    </th>
                    <th
                      class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                    >
                      KeyInfo ID
                    </th>
                    <th
                      class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                    >
                      User ID
                    </th>
                    <th
                      class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                    >
                      Contractor ID
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
                      {{ item.uuid }}
                    </td>
                    <td class="px-6 py-4 text-gray-500 border-b">
                      {{ item.pickup_photo_path }}
                    </td>
                    <td class="px-6 py-4 text-gray-500 border-b">
                      {{ item.purpose }}
                    </td>
                    <td class="px-6 py-4 text-gray-500 border-b">
                      {{ item.status }}
                    </td>
                    <td class="px-6 py-4 text-gray-500 border-b">
                      {{ item.keyinfo_id }}
                    </td>
                    <td class="px-6 py-4 text-gray-500 border-b">
                      {{ item.user_id }}
                    </td>
                    <td class="px-6 py-4 text-gray-500 border-b">
                      {{ item.contractor_id }}
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

interface GetContractorKeypickup {
  id: string;
  uuid: string;
  pickup_photo_path: string;
  purpose: string;
  status: string;
  keyinfo_id: string;
  user_id: string;
  contractor_id: string;
  created_at: Date; // Assuming these are dates
  updated_at: Date;
}

const contractorId = ref('');
const apiData = ref<GetContractorKeypickup[]>([]);

async function fetchDataByContractorId() {
  try {
    const id = contractorId.value;
    const url = `https://www.prototypeapp.online/api/contractors/${id}/keypickups`;
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
