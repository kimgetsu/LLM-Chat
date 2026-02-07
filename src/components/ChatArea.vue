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
                <h2>Welcome back, Denis</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

                <form class="input-container">
                    <input type="text" placeholder="How can I help you?">
                    <div class="btn-border">
                        <button type="submit">
                            <img src="../assets/icons/SubmitBtn.svg" alt="">
                        </button>
                    </div>
                </form>
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
    min-height: 96vh; /* Исправлю когда пойму как лучше обыграть ситуацию */
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
    margin-bottom: 20px;
    border-radius: 12px 12px 0 0;
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

.input-container .btn-border:hover {
    background: linear-gradient(to right, #1443b8, #1552b0);
}

.input-container .btn-border:hover button {
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
}

.welcome-card h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 10px;
    color: #2d3748;
}

.welcome-card p {
    color: #666F8D;
    margin-bottom: 20px;
    font-weight: 400;
    font-size: 0.95rem;
}

.input-container {
    display: flex;
    background: linear-gradient(to right, #f0f4ff, #e6f0ff);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
}

.input-container input{
    flex: 1;
    padding: 12px 16px;
    border: none;
    background: transparent;
    outline: none;
    font-size: 1rem;
    color: #2d3748;
}

.input-container input::placeholder {
    color: #666F8D;
    font-weight: 400;
    font-size: 0.95rem;
}

@media (max-width: 1023px) {
    .chat-container {
        padding: 20px;
        border-radius: 14px;
    }
    
    .chat-header {
        padding: 12px 15px;
        margin-bottom: 15px;
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
    }
    
    .welcome-card h2 {
        font-size: 1.4rem;
    }
    
    .welcome-card p {
        font-size: 0.9rem;
    }
    
    .input-container input,
    .input-container input::placeholder {
        font-size: 0.95rem;
    }
    
    .input-container .btn-border button {
        padding: 10px 14px;
        font-size: 0.95rem;
    }
}

@media (max-width: 767px) {
    .chat-container {
        padding: 15px;
        border-radius: 12px;
    }
    
    .chat-header {
        padding: 10px 12px;
        margin-bottom: 15px;
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
    
    .welcome-card h2 {
        font-size: 1.3rem;
    }
    
    .welcome-card p {
        font-size: 0.85rem;
    }
    
    .input-container {
        border-radius: 6px;
    }
    
    .input-container input {
        padding: 10px 12px;
        font-size: 0.9rem;
    }
    
    .input-container input::placeholder {
        font-size: 0.9rem;
    }
    
    .input-container .btn-border {
        border-radius: 0 6px 6px 0;
    }
    
    .input-container .btn-border button {
        padding: 10px 12px;
        font-size: 0.9rem;
        border-radius: 0 5px 5px 0;
    }
}
</style>