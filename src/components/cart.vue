<script setup>
import { useCartItems } from "@/composables/useValidation";
import { reactive, computed } from "vue";


const cart = reactive({
  items: [
    { id: 1, name: "Paneer", price: 120.0,discount:0, quantity: 1 },
    { id: 2, name: "Electric Kettle", price: 650.0,discount:0, quantity: 1 },
    { id: 3, name: "Knife", price: 100.0,discount:0, quantity: 1 },
    { id: 4, name: "Moong Dal", price: 60.0,discount:0, quantity: 1 },
    { id: 5, name: "Shampoo", price: 70.0,discount:0, quantity: 1 },
  ],
  taxPercent: 10,
});


const {handleItem,handleMinMax} = useCartItems()

const subtotal = computed(() => {
  return cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
});

const discountAmount = computed(() => {
  return cart.items.reduce((acc, item) => {
    return acc + (item.price * item.quantity * (item.discount / 100));
  }, 0);
});

const taxAmount = computed(() => {
  const afterDiscount = subtotal.value - discountAmount.value;
  return afterDiscount * (cart.taxPercent / 100);
});

const finalTotal = computed(() => {
  return subtotal.value - discountAmount.value + taxAmount.value;
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
};
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="center" >
      <v-col cols="auto">
        <v-card style="width:700px">
          <v-card-title class="text-center py-4 bg-orange-darken-3">Shopping Cart</v-card-title>
          <v-table hover>
            <thead >
              <tr >
                <th class="font-weight-black">Product</th>
                <th class="font-weight-black">Price</th>
                <th class="text-center font-weight-black">Quantity</th>
                <th class="text-center font-weight-black">Discount</th>
                <th class="text-right font-weight-black">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart.items" :key="item.id">
                <td class="font-weight-semibold">{{ item.name }}</td>
                <td>{{ formatCurrency(item.price) }}</td>
                <td style="width:200px">
                  <v-number-input
                    v-model="item.quantity"
                    variant="outlined"
                    controlVariant="split"
                    density="comfortable"
                    @update:model-value="handleItem(item)"
                    :min="0"
                    hide-details
                  />
                </td>
                <td>
                  <v-text-field
                  v-model.number="item.discount"
                  label="Discount (%)"
                  type="number"
                  variant="outlined"
                  density="compact"
                  suffix="%"
                  @update:model-value="(val)=>handleMinMax(val,item,'discount')"
                  hide-details
                />
                </td>
                <td class="text-right">{{ formatCurrency(item.price * item.quantity) }}</td>
              </tr>
            </tbody>
          </v-table>

          <v-divider />

          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" >
                <v-text-field
                  v-model.number="cart.taxPercent"
                  label="Tax (%)"
                  type="number"
                  variant="outlined"
                  density="comfortable"
                  @update:model-value="(val)=>handleMinMax(val, cart, 'taxPercent')"
                />
              </v-col>

              <v-col cols="12" sm="6" class="d-flex flex-column align-end">
                <div class="text-right">
                  <p>Subtotal: {{ formatCurrency(subtotal) }}</p>
                  <p class="text-error">
                    Discount ({{ cart.discountPercent }}%): -{{
                      formatCurrency(discountAmount)
                    }}
                  </p>
                  <p>
                    Tax ({{ cart.taxPercent }}%): +{{
                      formatCurrency(taxAmount)
                    }}
                  </p>
                  <v-divider class="my-2" />
                  <h3 class="text-primary">Total: {{ formatCurrency(finalTotal) }}</h3>
                </div>
              </v-col>
            </v-row>
          </v-card-text>

        
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* .w-100 {
  min-width: 120px;
} */

/* :deep(html), :deep(body) {
  height: 100%;
  margin: 0;
  overflow: hidden;
} */

.fill-height {
  min-height: 100vh ;
}
</style>
