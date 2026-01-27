<template>
  <h1 class="TextCssH">افزودن محصول جدید</h1>
  <div class="col-12 d-flex " style="justify-content: center;">



    <div class="box col-11 col-xl-10" ref="notification">


      <!-- کامپوننت مخصوص الرت و زمان نمایش و پیامی که از سرور دریافت میشود -->
      <!--      <AlertNotification v-if="notificationMessage" ref="alert" :message="notificationMessage"-->
      <!--                         :styleAlert="'success'" :duration="5000" />-->


      <!-- لودرمون -->
      <!--      <LoadingAdminPanel v-if="loading" ref="loading"> </LoadingAdminPanel>-->



      <div class="mt-4 col-xl-10">


        <form @submit.prevent="addProduct">
          <div class="mb-3">
            <label for="productName" class="form-label d-flex ">نام محصول:</label>
            <input type="text" id="productName" class="form-control border border-primary"
                   v-model="productName" required />
          </div>
          <div class="mb-3">
            <label for="productPrice" class="form-label d-flex">قیمت محصول:</label>
            <input type="number" id="productPrice" class="form-control border border-danger"
                   v-model="productPrice" required />
            <span class="price-display" v-if="productPrice">{{ formattedPriceInWords }}</span>
            <!-- نمایش قیمت به صورت نوشتاری -->
            <!-- خط زیر قیمت -->
            <div class="price-underline" v-if="productPrice"></div>
          </div>
          <div class="mb-3">
            <label for="productDescription" class="form-label d-flex">توضیحات:</label>
            <textarea id="productDescription" class="form-control border border-success"
                      v-model="productDescription"></textarea>
          </div>
          <div class="mb-3">
            <label for="productCategory" class="form-label d-flex">دسته‌بندی محصول:</label>
            <select id="productCategory" class="form-control border border-primary"
                    v-model="productCategory" required>
              <option value="" disabled>انتخاب کنید...</option>

              <!-- نمایش دسته‌بندی‌های اصلی -->
              <option v-for=" category in categories" :key="category.id" :value="category._id">
                {{ category.name }}
              </option>

              <template v-for="category in categories">
                <option v-for="subcategory in category.children" :key="subcategory.id"
                        :value="subcategory._id">
                  -{{ subcategory.name }}
                </option>
              </template>
            </select>
          </div>
          <div class="mb-3">
            <label for="productImages" class="form-label d-flex">عکس محصول:</label>
            <input type="file" name="images[]" id="productImages" class="form-control border border-warning"
                   @change="handleFileUpload" multiple />
          </div>
          <div class="mb-3">
            <label for="productColors" class="form-label d-flex">رنگ‌بندی:</label>
            <div v-for="(color, index) in productColors" :key="index" class="input-group mb-2">
              <input type="color" name="colors"
                     class="form-control form-control-color border border-info ColorInputCss rounded"
                     v-model="productColors[index].color" />
              <input type="text" class="form-control border border-info rounded"
                     v-model="productColors[index].name" placeholder="نام رنگ یا توضیح" />
              <button type="button" class="btn btn-danger rounded BtnDeleteCss"
                      @click="removeColor(index)">حذف</button>
            </div>
            <button type="button" class="btn btn-secondary" @click="addColor">افزودن رنگ</button>
          </div>
          <div class="mb-3">
            <label for="productSizes" class="form-label d-flex">سایزبندی:</label>
            <div v-for="(size, index) in productSizes" :key="index" class="input-group mb-2">
              <input type="text" name="sizes" class="form-control border border-dark rounded"
                     v-model="productSizes[index]" placeholder="سایز محصول" />
              <button type="button" class="btn btn-danger rounded BtnDeleteCss"
                      @click="removeSize(index)">حذف</button>
            </div>
            <button type="button" class="btn btn-secondary" @click="addSize">افزودن سایز</button>
          </div>
          <div class="mb-3">
            <label for="productQuantity" class="form-label d-flex">تعداد محصول:</label>
            <input type="number" id="productQuantity" class="form-control border border-info"
                   v-model="productQuantity" min="0" required />
          </div>
          <button type="submit" class="btn btn-primary" style="margin: 1rem 0rem;" :disabled="loading">{{
              loading ? 'در حال بارگذاری...'
                  :
                  'افزودن محصول' }}</button>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
// import PN from "persian-number";
// import AlertNotification from '../AlertAdminPanel.vue'
// import LoadingAdminPanel from '../LoadingAdminPanel.vue';

export default {
  // components: {
  //   AlertNotification,
  //   LoadingAdminPanel
  // },
  data() {
    return {
      productName: '',
      productPrice: '',
      productDescription: '',
      productImages: [],
      productColors: [{ color: '#ffffff', name: '' }],
      productSizes: [''],
      loading: false , // حالت بارگذاری
      productQuantity: 0, // مقدار اولیه برای تعداد محصول
      productCategory: '', // فیلد برای ذخیره دسته‌بندی انتخاب شده
      categories: [], // آرایه دسته‌بندی‌ها
      notificationMessage: '', // یا مقدار پیش‌فرض دلخواه
    };
  },
  mounted() {
    this.loadCategories();

  },
  methods: {

    async loadCategories() {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        this.categories = response.data; // فرض بر این است که دسته‌بندی‌ها از سرور دریافت می‌شوند
        this.$refs.loading.toggleLoader(true)
        this.loading = true


      } catch (error) {
        this.notificationMessage = error.response ? error.response.data.message : "مشکلی در ارتباط با سرور وجود دارد"; // اگر خطا پاسخ سرور داشته باشد، پیام آن را نمایش بده
        this.$refs.alert.showNotification();
      }
      finally {
        this.loading = false
      }
    },
    handleFileUpload(event) {
      const files = event.target.files;
      this.productImages = Array.from(files); // فایل‌ها را به آرایه productImages اضافه کنید
    },
    addColor() {
      if (this.productColors[this.productColors.length - 1].color !== '' && this.productColors[this.productColors.length - 1].name !== '') {
        this.productColors.push({ color: '#ffffff', name: '' });
      } else {
        alert('لطفاً رنگ و نام رنگ را وارد کنید.');
      }
    },
    removeColor(index) {
      this.productColors.splice(index, 1);
    },
    addSize() {
      if (this.productSizes[this.productSizes.length - 1] !== '') {
        this.productSizes.push('');
      } else {
        alert('لطفاً سایز را وارد کنید.');
      }
    },
    removeSize(index) {
      this.productSizes.splice(index, 1);
    },
    async addProduct() {
      this.loading = true; // فعال‌سازی حالت بارگذاری
      try {
        const formData = new FormData();
        formData.append('name', this.productName);
        formData.append('price', this.productPrice);
        formData.append('description', this.productDescription);
        formData.append('category', this.productCategory);

        console.log("Product Category: ", this.productCategory);  // اینجا چاپ می‌شود
        this.productImages.forEach((image) => {
          formData.append('images[]', image);
        });

        // موجودی محصول
        formData.append('quantity', this.productQuantity);


        formData.append('colors[]', JSON.stringify(this.productColors));  // ارسال کامل رنگ‌ها با نام‌ها
        formData.append('sizes[]', JSON.stringify(this.productSizes));    // ارسال سایزها

        const response = await axios.post('http://localhost:5000/api/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        // نمایش پیغام سرور با کنترل تایم نمایش
        this.notificationMessage = response.data.message; // ذخیره پیغام در data
        this.$refs.alert.showNotification();
        this.resetForm(); // پاک کردن فرم بعد از افزودن محصول

      } catch (error) {
        this.notificationMessage = error.response ? error.response.data.message : "مشکلی در ارتباط با سرور وجود دارد"; // اگر خطا پاسخ سرور داشته باشد، پیام آن را نمایش بده
        this.$refs.alert.showNotification();


      } finally {
        this.loading = false; // غیرفعال‌سازی حالت بارگذاری
      }
    },
    resetForm() {
      this.productName = '';
      this.productPrice = '';
      this.productDescription = '';
      this.productImages = [];
      this.productColors = [{ color: '#ffffff', name: '' }];
      this.productSizes = [''];
      this.productCategory = '';
      this.productQuantity = '';


    },
    toPersian(number) {
      const persianNumbers = ["صفر", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
      return persianNumbers[number] || number; // فقط عددهای 0 تا 9 را به کلمات تبدیل می‌کند
    }
  },
  // computed: {
  //   formattedPriceInWords() {
  //     // return PN.convert(this.productPrice) + ' تومان'; // تبدیل قیمت به نوشتار
  //   }
  // }
};
</script>

<style scoped>
.box {
  box-shadow: 0 3px 20px #45aaf27d;
}
.TextCssH {
  box-shadow: 0 0px 8px #45aaf27d;
}

.BtnDeleteCss {
  margin-right: 5px;
}

input:focus {
  border-color: transparent;
  /* رنگ مرزی را حذف می‌کند */
  box-shadow: none;
  /* سایه‌ی اطراف فیلد را حذف می‌کند */
}


.ColorInputCss {
  max-width: 52px;
  border-radius: 4px;
  margin-left: 8px;
}



.content {
  padding: 0;
}

.price-display {
  color: #fa3131;
  display: flex;
  margin-top: 8px;
  font-weight: 300;
  margin-bottom: 0px;
  padding-bottom: 4px;
  width: auto;

}

.price-underline {
  display: flex;
  width: 50%;
  /* عرض خط را کمی کمتر از 100% تنظیم می‌کند تا با padding جا شود */
  border-bottom: 1px solid rgba(0, 0, 0, 0.451);
  /* خط سیاه */
  margin-top: 4px;
  /* فاصله بین متن و خط */
  margin-bottom: 8px;
  /* فاصله پایین خط */
}

@media (max-width: 600px) {
  .price-underline {
    display: flex;
    width: 100%;
    /* عرض خط را کمی کمتر از 100% تنظیم می‌کند تا با padding جا شود */
    border-bottom: 1px solid rgba(0, 0, 0, 0.451);
    /* خط سیاه */
    margin-top: 4px;
    /* فاصله بین متن و خط */
    margin-bottom: 8px;
    /* فاصله پایین خط */
  }
}
</style>
