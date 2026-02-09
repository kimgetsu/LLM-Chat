<template>
    <div class="chat-container">
        <header class="chat-header">
            <h1>Chats</h1>
            <div class="btn-border">
                <button>+ New chat</button>
            </div>
        </header>

        <main class="chat-main">
            <div class="welcome-card">
                <div class="welcome-content">
                    <div class="text-section">
                        <h2>Welcome back, Denis</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                    </div>
                    <form class="input-section">
                        <input type="text" placeholder="How can I help you?">
                        <div class="btn-border">
                            <button type="submit">
                                <img src="../assets/icons/SubmitBtn.svg" alt="">
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
    background: white;
    min-height: 96vh; /* Всё ещё не понял как исправить ситуацию */
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    margin: 20px;
}

.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid #e2e8f0;
    margin: 0 -20px 20px -20px;
    background: white;
}

.chat-header h1 {
    font-weight: 500;
    font-size: 1.25rem;
    color: #19213D;
}

.btn-border {
    background: linear-gradient(to right, #174BD2, #185AC2);
    border-radius: 8px;
    padding: 1px;
    display: inline-block;
    transition: background 0.3s ease;
}

.btn-border button {
    background: linear-gradient(to right, #2B7AFB, #2174FD, #213BFD);
    border: none;
    outline: none;
    border-radius: 7px;
    padding: 12px 16px;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    width: 100%;
    height: 100%;
    font-weight: 500;
    transition: background 0.3s ease;
}

.btn-border:hover {
    background: linear-gradient(to right, #1443b8, #1552b0);
}

.btn-border:hover button {
    background: linear-gradient(to right, #266de0, #1e68e0, #1d36e0);
}

.welcome-card {
    position: relative;
    background-color: white;
    background-image: url('/src/assets/icons/BackgroundInput.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    margin: 0 auto;
    min-width: 300px;
    max-width: 774px;
    width: 100%; 
    height: 234px; 
    border: 1px solid #e2e8f0;
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

/* Текстовая секция */
.text-section {
    width: 400px;
    text-align: center;
}

.text-section h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 10px;
    color: #2d3748;
}

.text-section p {
    color: #666F8D;
    margin: 0;
    font-weight: 400;
    font-size: 0.95rem;
    line-height: 1.4;
}
.input-section {
    display: flex;
    background: linear-gradient(to right, #f0f4ff, #e6f0ff);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    width: 400px;
    height: 58px;
}

.input-section input{
    flex: 1;
    padding: 12px 16px;
    border: none;
    background: transparent;
    outline: none;
    font-size: 1rem;
    color: #2d3748;
}

.input-section input::placeholder {
    color: #666F8D;
    font-weight: 400;
    font-size: 0.95rem;
}

.input-section .btn-border {
    background: linear-gradient(to right, #174BD2, #185AC2);
    border-radius: 0 8px 8px 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.input-section .btn-border button {
    background: linear-gradient(to right, #2B7AFB, #2174FD, #213BFD);
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
    background: linear-gradient(to right, #1443b8, #1552b0);
}

.input-section .btn-border:hover button {
    background: linear-gradient(to right, #266de0, #1e68e0, #1d36e0);
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
    
    .chat-header h1 {
        font-size: 1.1rem;
    }
    
    .btn-border button {
        padding: 10px 14px;
        font-size: 0.95rem;
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
    
    .text-section h2 {
        font-size: 1.4rem;
    }
    
    .text-section p {
        font-size: 0.9rem;
    }
    
    .input-section {
        width: 350px;
        height: 52px;
    }
    
    .input-section input,
    .input-section input::placeholder {
        font-size: 0.95rem;
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
    
    .chat-header h1 {
        font-size: 1rem;
    }
    
    .btn-border {
        border-radius: 6px;
    }
    
    .btn-border button {
        padding: 8px 12px;
        font-size: 0.9rem;
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
    
    .text-section h2 {
        font-size: 1.3rem;
    }
    
    .text-section p {
        font-size: 0.85rem;
    }
    
    .input-section {
        width: 100%;
        max-width: 400px;
        height: 50px;
        border-radius: 6px;
    }
    
    .input-section input {
        padding: 10px 12px;
        font-size: 0.9rem;
    }
    
    .input-section input::placeholder {
        font-size: 0.9rem;
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
    
    .chat-header h1 {
        font-size: 0.9rem;
    }
    
    .btn-border button {
        padding: 6px 10px;
        font-size: 0.8rem;
    }
    
    .welcome-card {
        padding: 16px;
        min-height: 160px;
    }
    
    .welcome-content {
        gap: 20px;
    }
    
    .text-section h2 {
        font-size: 1.1rem;
    }
    
    .text-section p {
        font-size: 0.8rem;
    }
    
    .input-section {
        height: 46px;
    }
    
    .input-section input {
        padding: 8px 10px;
        font-size: 0.85rem;
    }
    
    .input-section input::placeholder {
        font-size: 0.85rem;
    }
    
    .input-section .btn-border button {
        width: 44px;
        height: 44px;
    }
}
</style>