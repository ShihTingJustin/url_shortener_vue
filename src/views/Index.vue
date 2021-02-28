<template>
  <section class="border">
    <div class="text-center d-flex flex-column">
      <div class="manager d-flex justify-content-end">
        <router-link to="/manager" class="manager-icon fas fa-list mt-3 mr-3"></router-link>
      </div>
      <div class="logo mt-3">
        <router-link to="/">URL SHORTENER<i class="fas fa-link fa-lg ml-2"></i></router-link>
      </div>
      <div class="data-wrap mt-4">
        <form
          action="/"
          method="POST"
          class="w-100 d-flex flex-column align-items-center"
        >
          <div style="height: 50px" class="w-75">
            <input
              required
              type="url"
              name="url"
              placeholder="Please enter URL here"
              class="input-area w-100 text-center"
              value=""
            />
          </div>
          <button type="submit" class="submit-btn btn w-25">Shorten</button>
        </form>
      </div>
    </div>
  </section>
</template>

<style>
section {
  width: 600px;
  height: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -180px 0 0 -300px;
  display: table;
}

.logo {
  background-color: transparent;
  margin-bottom: 5rem;
}

.logo a:hover {
  text-decoration: none;
}

.logo i {
  color: #7d9ec0;
}

.logo a:hover i {
  color: #5a728a;
  transition-duration: 0.5s;
  /* box-shadow:  0 0px 30px rgb(194, 194, 194); */
}

.submit-btn {
  color: #ececec;
  margin-top: 1.5rem;
}

.submit-btn,
.copy-btn {
  background-color: #82a5c7;
}

.submit-btn:hover,
.copy-btn:hover {
  background-color: #5a728a;
  color: #ffffff;
}

.manager-icon {
  color: #82a5c7;
  cursor: pointer;
}

.manager-icon:hover {
  color: #5a728a;
  transition-duration: 0.5s;
  text-decoration: transparent;
}

.input-area {
  border: none;
  border-bottom: 1px solid #ececec;
  outline: none;
  background: transparent;
  border-radius: 0;
  letter-spacing: 0.5px;
}

.valid-input-area,
.copy-btn {
  border: none;
  outline: none;
}

.input-area,
.logo a,
.logo a:hover,
.valid-input-area,
.valid-input-area:focus,
.m-description {
  color: #2e2e2e;
}
</style>