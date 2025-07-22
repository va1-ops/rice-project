<template>
  <footer class="footer">
    <div class="container">
      <div class="col-sm-4">
        <div>
          <p>版权所有：滁州学院地理信息学院</p>
          <p>地址：会峰路1号</p>
        </div>
        <p>备案号00000000001</p>
      </div>
    </div>
    </footer>
</template>

<style>
.footer {
  margin-top: 20px;
  background-color: #f5f5f5;
  color: #666;
  font-size: 14px;
  text-align: center;
  
  height: 200px;
  width: 100%;
  border-radius: 0 0 20px 20px;
}

.col-sm-4{
  margin:60px ;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;

}

.text-right {
  text-align: right;
}

a {
  color: #666;
  text-decoration: none;
}

a:hover {
  color: #000;
  text-decoration: underline;
}
</style>