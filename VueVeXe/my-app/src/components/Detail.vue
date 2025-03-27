<template>
  <div class="detail-container">
    <header class="header bg-blue-600 text-white p-4">
      <button @click="$router.push('/')" class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 back-button">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
          Quay lại Trang Chủ
        </button>
      <div class="container mx-auto flex items-center justify-between">
        <h1 class="text-2xl font-bold">Chi Tiết Xe</h1>
      </div>
    </header>

    <main class="container mx-auto p-6">
      <div v-if="bus" class="bus-detail bg-white shadow-lg rounded-lg p-6">
        <img :src="bus.image" alt="Bus Image" class="bus-image mb-4" />
        <h2 class="text-3xl font-bold text-blue-600">{{ bus.name }}</h2>
        <p class="text-gray-600 mt-2">{{ bus.description }}</p>

        <div class="route-info mt-4">
          <p><strong>Tuyến đường:</strong> {{ bus.route.from }} - {{ bus.route.to }}</p>
          <p><strong>Thời gian dự kiến:</strong> {{ bus.route.estimatedTime }}</p>
          <p><strong>Giá vé:</strong> {{ bus.price }} VNĐ</p>
          <p><strong>Số ghế trống:</strong> {{ bus.availableSeats }}</p>
        </div>

        <button class="bg-blue-600 text-white px-6 py-2 mt-4 rounded datve-button" @click="showModal = true">
          <i class="fa fa-ticket" aria-hidden="true"></i> Đặt vé ngay
        </button>
      </div>
      <p v-else class="text-center text-gray-500">Không tìm thấy thông tin xe.</p>
    </main>

    <div class="reviews mt-6">
          <h3 class="text-2xl font-semibold mb-4">Đánh giá và Bình luận</h3>
          <div v-for="review in bus.reviews" :key="review.id" class="review mb-4">
            <p><strong>{{ review.user }}</strong> - {{ review.rating }} sao</p>
            <p>{{ review.comment }}</p>
          </div>
          <div class="add-review mt-6">
            <h4 class="text-xl font-semibold mb-2">Thêm đánh giá của bạn</h4>
            <input v-model="newReview.user" type="text" placeholder="Tên của bạn" class="input mb-2" />
            <select v-model="newReview.rating" class="input mb-2">
              <option disabled value="">Chọn số sao</option>
              <option v-for="n in 5" :key="n" :value="n">{{ n }} sao</option>
            </select>
            <textarea v-model="newReview.comment" placeholder="Bình luận của bạn" class="input mb-2"></textarea>
            <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" @click="addReview">Gửi đánh giá</button>
        </div>
      </div>

    <!-- Modal -->
    <div class="modal-overlay" v-if="showModal" @click.self="showModal = false">
      <div class="modal-content">
        <h3 class="text-2xl font-semibold mb-4">Chọn ghế ngồi</h3>
        <div class="seating-chart">
          <div class="driver-icon"><img src="@/assets/steering-wheel.png"></div> <!-- Icon vô lăng -->
          <div class="seating-columns">
            <div v-for="(column, columnIndex) in seatingLayout" :key="columnIndex" class="seat-column">
              <div v-for="(seat, seatIndex) in column" :key="seatIndex" 
                   :class="['seat', seat.status]" 
                   @click="selectSeat(seat)">
                {{ seat.label }}
              </div>
            </div>
          </div>
        </div>
        <div class="selected-seats mt-4">
          <h3 class="text-xl font-semibold">Ghế đã chọn:</h3>
          <p v-if="selectedSeats.length === 0">Chưa có ghế nào được chọn.</p>
          <ul v-else>
            <li v-for="seat in selectedSeats" :key="seat">{{ seat }}</li>
          </ul>
        </div>
        <div class="modal-buttons">
          <button class="confirm-button" @click="bookSeats">
            <i class="fa fa-check" aria-hidden="true"></i> Xác nhận đặt vé
          </button>
          <button class="close-button" @click="showModal = false">
            <i class="fa fa-window-close" aria-hidden="true"></i> Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BusDetail',
  props: ['id'],
  data() {
    return {
      bus: null,
      seatingLayout: [],
      selectedSeats: [],
      showModal: false,
      newReview: {
        user: '',
        rating: '',
        comment: ''
      }
    };
  },
  created() {
    this.fetchBusDetails();
    this.initializeSeatingChart();
  },
  methods: {
    fetchBusDetails() {
      const buses = [
        { id: 1, name: "Xe Phương Trang", image: require('@/assets/xe-phuong-trang-7.png'), description: "Hành trình tiện lợi và thoải mái.", route: { from: "Hà Nội", to: "Hải Phòng", estimatedTime: "2 giờ 30 phút" }, price: "500000", availableSeats: 20 },
      ];
      this.bus = buses.find(bus => bus.id === parseInt(this.id));
    },
    initializeSeatingChart() {
      const columns = 4;
      const seatsPerColumn = 5;
      for (let i = 1; i <= columns; i++) {
        const column = [];
        for (let j = 1; j <= seatsPerColumn; j++) {
          column.push({ label: `${String.fromCharCode(64 + i)}${j}`, status: 'available' });
        }
        this.seatingLayout.push(column);
      }
    },
    selectSeat(seat) {
      if (seat.status === 'available') {
        seat.status = 'selected';
        this.selectedSeats.push(seat.label);
      } else if (seat.status === 'selected') {
        seat.status = 'available';
        this.selectedSeats = this.selectedSeats.filter(s => s !== seat.label);
      }
    },
    bookSeats() {
      if (this.selectedSeats.length === 0) {
        alert('Vui lòng chọn ít nhất một ghế.');
        return;
      }
      alert(`Bạn đã đặt thành công các ghế: ${this.selectedSeats.join(', ')}`);
      this.selectedSeats = [];
      this.showModal = false;
    },
    addReview() {
      if (!this.newReview.user || !this.newReview.rating || !this.newReview.comment) {
        alert('Vui lòng điền đầy đủ thông tin đánh giá.');
        return;
      }
      const newReview = { ...this.newReview, id: Date.now() };
      this.bus.reviews.push(newReview);
      this.newReview.user = '';
      this.newReview.rating = '';
      this.newReview.comment = '';
    }
  }
};
</script>

<style scoped>
.detail-container {
  padding: 20px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
}
.seating-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.driver-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}
.seating-columns {
  display: flex;
}
.seat-column {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}
.driver-icon img {
  width: 50px;
  margin-right: 180px;
}
.seat {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid black;
  margin: 2px;
}
.seat.available { background-color: #4caf50; }
.seat.selected { background-color: #ffeb3b; }
.seat.booked { background-color: #f44336; cursor: not-allowed; }

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  cursor: pointer;
  height: 40px;
}
.modal-buttons button {
  flex: 1;
  border-radius: 10px;
  margin: 0 5px;
}
.modal-buttons .confirm-button {
  background-color: #4caf50; /* Màu xanh lá cây */
  color: white;
}
.modal-buttons .close-button {
  background-color: #f44336; /* Màu đỏ */
  color: white;
}
.modal-buttons .confirm-button:hover {
  background-color: #45a049; /* Màu xanh lá cây đậm hơn khi hover */
}
.modal-buttons .close-button:hover {
  background-color: #e53935; /* Màu đỏ đậm hơn khi hover */
}
.back-button, .datve-button {
  height: 40px;
}
.datve-button {
  background-color: #18eb1f;
}
.datve-button:hover {
  background-color: #4aed4a;
}
.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
