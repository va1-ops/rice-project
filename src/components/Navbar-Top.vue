<script setup lang="ts">


</script>

<!-- 导航栏 -->
 <template>
    <nav >
        
    <div class="top">
    <div class="标题">
        <img src="/log.png" class="log" />
        <img src="/图片1.png" class="名称" />
    </div>
    
    <div class="login">
      <router-link to="/login" class="login-button">登录</router-link>
      <router-link to="/login" class="login-button">注册</router-link>
      
    </div>
  </div>

  <div class="menu">
    <router-link to="/" class="button-menu">首页</router-link>
    <router-link to="/mangement" class="button-menu">数据管理</router-link>
    <router-link to="/get" class="button-menu">信息提取</router-link>
    <router-link to="/getsee" class="button-menu">可视化分析</router-link>
    <router-link to="/help" class="button-menu">帮助</router-link>
  </div>

    </nav>
 </template>
 <style>
.login-button{
    width: 80px;
    height: 40px;
    line-height: 70px;
    text-align: center;
    /* align-items: center; */
    /* background:rgb(139, 217, 198); */
    border-radius: 20px;
    color: rgb(40, 22, 145);
    margin: 5px;
    font-size: 30px;
    font-weight: 500;
    cursor: pointer;
  }
  .login{
    padding-right: 20px;
  }

  .top{
    /* background: white; */
    justify-content: space-between;
    display: flex;
    user-select: none;
    margin-bottom: 10px;
  }
  .标题{
    display: flex;
    margin-left: 5px;
  }
  .名称{ 
    margin: 0 0 0 0;
    max-width: 100%;
    height: 60px;
    line-height: 80px;
    /* font-size: 40px;
    font-weight: 700; */
    /* color: rgb(9, 104, 236);
    padding-left: 30px; */
    /* width: 100%;
    height: 100%; */
    /* text-align: center; */
    /* text-shadow: 2px 2px 4px gray; */
  } 

  .log{
     margin: 5px 0 0 0;
     height: 60px;
  }
 
  .button-menu{
    text-align: center;
    line-height: 80px;
    border-radius:15px ;
    align-content: center;
    font-size: 30px;
    color: rgb(5, 74, 9);
    user-select: none;
    /* font-family: ; */
    font-weight: 600;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
  }
  .button-menu:hover{
    transform: scale(1.2); /* 放大 10% */
    /* box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); 添加阴影增强凸出感 */
  }
  .menu{
    /* border: 9px; */
    /* width: 100%; */
    height: 80px;
    /* margin: 5px 0 5px 0  ; */
    /* background: white; */
    /* opacity: 0.9; */
    display: flex;
    padding: 0 10% 0 10%;
    justify-content: space-between ;
    background: linear-gradient(
    135deg,
    rgba(54, 123, 208, 0.8) 0%,
    rgba(12, 195, 79, 0.4) 100%);
    box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126),
        0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224),
        0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .menu:hover{
    transform: scale(1,1);
  }
</style>