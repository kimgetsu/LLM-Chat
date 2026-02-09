<template>
    <div class="chat-container">
        <header class="chat-header">
            <h1 class="d-3 medium">Chats</h1>
            <div class="btn-border">
                <button class="d-1 medium">+ New chat</button>
            </div>
        </header>

        <main class="chat-main">
            <div class="welcome-card">
                <div class="welcome-content">
                    <div class="text-section">
                        <h2 class="d-5 medium">Welcome back, Denis</h2>
                        <p class="p-default regular">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                    </div>
                    <form class="input-section">
                        <input type="text" placeholder="How can I help you?">
                        <div class="btn-border">
                            <button type="submit">
                                <img src="/src/assets/icons/SubmitBtn.svg" alt="">
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.chat-main {
    display: flex;
    justify-content: center;
    padding: 20px 0;
}

.chat-container {
    background: var(--neutral-100);
    height: 100%;
    padding: 20px;
    border-radius: 16px;
    box-shadow: var(--sh-neutral-medium);
    border: 1px solid var(--neutral-400);
}

.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid var(--neutral-400);
    margin: 0 -20px 20px -20px;
    background: var(--neutral-100);
}

.btn-border {
    background: var(--blue-gradient);
    border-radius: 8px;
    padding: 1px;
    display: inline-block;
    transition: background 0.3s ease;
}

.btn-border button {
    background: var(--blue-gradient);
    border: none;
    outline: none;
    border-radius: 7px;
    padding: 12px 16px;
    color: var(--neutral-100);
    cursor: pointer;
    width: 100%;
    height: 100%;
    transition: background 0.3s ease;
}

.btn-border:hover {
    background: linear-gradient(45deg, #0068E5 0%, #B8DDFF 100%);
}

.btn-border:hover button {
    background: linear-gradient(45deg, #0068E5 0%, #B8DDFF 100%);
}

.welcome-card {
    position: relative;
    background-color: var(--neutral-100);
    background-image: url('/src/assets/icons/BackgroundInput.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 12px;
    padding: 30px;
    box-shadow: var(--sh-neutral-regular);
    margin: 0 auto;
    min-width: 300px;
    max-width: 774px;
    width: 100%; 
    height: 234px; 
    border: 1px solid var(--neutral-400);
    display: flex;
    align-items: center;
    justify-content: center;
}

.welcome-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 32px;
}

.text-section {
    width: 400px;
    text-align: center;
}

.text-section p {
    color: var(--neutral-600);
}

.input-section {
    display: flex;
    background: linear-gradient(to right, #f0f4ff, #e6f0ff); /* Возможно вынести */
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--neutral-400);
    width: 400px;
    height: 58px;
}

.input-section input{
    flex: 1;
    padding: 12px 16px;
    border: none;
    background: transparent;
    outline: none;
    color: var(--neutral-700);
}

.input-section input::placeholder {
    color: var(--neutral-600);
}

.input-section .btn-border {
    background: var(--blue-gradient);
    border-radius: 0 8px 8px 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.input-section .btn-border button {
    background: var(--blue-gradient);
    border-radius: 0 7px 7px 0;
    padding: 0;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.input-section .btn-border button img {
    width: 20px;
    height: 20px;
}

.input-section .btn-border:hover {
    background: linear-gradient(45deg, #0068E5 0%, #B8DDFF 100%);
}

.input-section .btn-border:hover button {
    background: linear-gradient(45deg, #0068E5 0%, #B8DDFF 100%);
}

@media (max-width: 1023px) {
    .chat-container {
        padding: 20px;
        border-radius: 14px;
    }
    
    .chat-header {
        padding: 12px 20px;
        margin: 0 -20px 15px -20px;
    }
    
    .btn-border button {
        padding: 10px 14px;
    }
    
    .welcome-card {
        max-width: 600px;
        padding: 25px;
        height: auto;
        min-height: 200px;
    }
    
    .welcome-content {
        gap: 28px;
    }
    
    .text-section {
        width: 350px;
    }
    
    .input-section {
        width: 350px;
        height: 52px;
    }
    
    .input-section .btn-border button {
        width: 50px;
        height: 50px;
    }
    
    .input-section .btn-border button img {
        width: 18px;
        height: 18px;
    }
}

@media (max-width: 767px) {
    .chat-container {
        padding: 15px;
        border-radius: 12px;
    }
    
    .chat-header {
        padding: 10px 15px;
        margin: 0 -15px 15px -15px;
    }
    
    .btn-border {
        border-radius: 6px;
    }
    
    .btn-border button {
        padding: 8px 12px;
        border-radius: 5px;
    }
    
    .welcome-card {
        max-width: 100%;
        padding: 20px;
        min-height: 180px;
    }
    
    .welcome-content {
        gap: 24px;
    }
    
    .text-section {
        width: 100%;
        max-width: 400px;
    }
      
    .input-section {
        width: 100%;
        max-width: 400px;
        height: 50px;
        border-radius: 6px;
    }
    
    .input-section input {
        padding: 10px 12px;
    }
    
    .input-section .btn-border {
        border-radius: 0 6px 6px 0;
    }
    
    .input-section .btn-border button {
        width: 48px;
        height: 48px;
        border-radius: 0 5px 5px 0;
    }
    
    .input-section .btn-border button img {
        width: 18px;
        height: 18px;
    }
}

@media (max-width: 359px) {
    .chat-container {
        padding: 12px;
    }
    
    .chat-header {
        padding: 8px 12px;
        margin: 0 -12px 12px -12px;
    }
    
    .btn-border button {
        padding: 6px 10px;
    }
    
    .welcome-card {
        padding: 16px;
        min-height: 160px;
    }
    
    .welcome-content {
        gap: 20px;
    }
      
    .input-section {
        height: 46px;
    }
    
    .input-section input {
        padding: 8px 10px;
    }
    
    .input-section .btn-border button {
        width: 44px;
        height: 44px;
    }
}
</style>