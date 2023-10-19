<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb breadcrumb="GetContractorKeypickups" />

    <div class="mt-8">
      <h4 class="text-gray-600">Get Contractor Keypickups</h4>

      <div class="form-row">
        <div class="mt-4">
          <label for="getAPI">Enter Contractor ID: </label>
          <input v-model="contractorId" type="text" class="px-4 py-2 border rounded-md" />
          <button @click="fetchDataByContractorId" class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
            Fetch Data
          </button>
          <br><br>
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
    const url = `http://keyman-env.eba-dhwuuaiv.us-east-1.elasticbeanstalk.com/api/contractors/${id}/keypickups`;
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
</script>
