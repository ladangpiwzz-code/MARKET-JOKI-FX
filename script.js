// MARKET JOKI FX - WhatsApp Order Automation

document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('jokiOrderForm');
    const whatsappNumber = '083878235306';
    
    // Form submission handler
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            nama: document.getElementById('nama').value,
            modal: document.getElementById('modal').value,
            tujuan: document.getElementById('tujuan').value,
            target: document.getElementById('target').value,
            bank: document.querySelector('input[name="bank"]:checked')?.value,
            rekening: document.getElementById('rekening').value,
            nohp: document.getElementById('nohp').value
        };
        
        // Validate form
        if (!validateForm(formData)) {
            return;
        }
        
        // Format WhatsApp message
        const message = formatWhatsAppMessage(formData);
        
        // Send to WhatsApp
        sendToWhatsApp(formData.nohp, message);
        
        // Show success message
        showSuccessMessage(formData.nama);
        
        // Save to localStorage for dashboard
        saveOrderToStorage(formData);
    });
    
    // Form validation
    function validateForm(data) {
        if (!data.nama || !data.modal || !data.tujuan || !data.target || !data.bank || !data.rekening || !data.nohp) {
            alert('Harap lengkapi semua data!');
            return false;
        }
        
        if (!/^[0-9]{10,13}$/.test(data.nohp.replace(/\D/g, ''))) {
            alert('Nomor WhatsApp tidak valid!');
            return false;
        }
        
        return true;
    }
    
    // Format WhatsApp message
    function formatWhatsAppMessage(data) {
        return `Kak mau order joki

NAMA: ${data.nama}
MODAL: ${data.modal}
TUJUAN: ${data.tujuan}
TARGET: ${data.target}
REKENING PENCAIRAN: ${data.bank} - ${data.rekening}

Saya ingin menggunakan jasa joki trading dari MARKET JOKI FX.`;
    }
    
    // Send to WhatsApp
    function sendToWhatsApp(phone, message) {
        // Clean phone number
        const cleanPhone = phone.replace(/\D/g, '');
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
        
        // Open in new tab
        window.open(whatsappURL, '_blank');
    }
    
    // Show success message
    function showSuccessMessage(nama) {
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 40px;
                border-radius: 15px;
                text-align: center;
                max-width: 500px;
                width: 90%;
            ">
                <div style="
                    width: 80px;
                    height: 80px;
                    background: #4CAF50;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                ">
                    <i class="fas fa-check" style="color: white; font-size: 2rem;"></i>
                </div>
                <h3 style="color: #333; margin-bottom: 15px;">ORDER BERHASIL!</h3>
                <p style="color: #666; margin-bottom: 20px;">
                    Hai ${nama}, order joki Anda berhasil dikirim!<br>
                    Silakan lanjutkan konfirmasi via WhatsApp yang telah terbuka.
                </p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: #ff4081;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    font-size: 1rem;
                    cursor: pointer;
                ">
                    TUTUP
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Auto remove after 10 seconds
        setTimeout(() => {
            if (modal.parentElement) {
                modal.parentElement.removeChild(modal);
            }
        }, 10000);
    }
    
    // Save order to localStorage
    function saveOrderToStorage(data) {
        const orders = JSON.parse(localStorage.getItem('jokiOrders') || '[]');
        
        const order = {
            id: Date.now(),
            ...data,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };
        
        orders.push(order);
        localStorage.setItem('jokiOrders', JSON.stringify(orders));
        
        console.log('Order saved:', order);
    }
    
    // Auto-format phone number
    document.getElementById('nohp').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (!value.startsWith('0') && !value.startsWith('62')) {
                value = '0' + value;
            }
            if (value.length > 4) {
                value = value.replace(/(\d{4})(?=\d)/, '$1-');
            }
            if (value.length > 9) {
                value = value.replace(/(\d{4})-(\d{4})(?=\d)/, '$1-$2-');
            }
        }
        e.target.value = value;
    });
    
    // Modal for terms and conditions
    const termsLink = document.querySelector('a[href="#"]');
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            showTermsModal();
        });
    }
    
    function showTermsModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            ">
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                ">
                    <h3 style="color: #333; margin: 0;">SYARAT & KETENTUAN</h3>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        cursor: pointer;
                        color: #666;
                    ">
                        ×
                    </button>
                </div>
                <div style="color: #666;">
                    <p><strong>1. Ketentuan Umum</strong></p>
                    <p>Dengan menggunakan jasa joki trading MARKET JOKI FX, Anda menyetujui semua ketentuan yang berlaku.</p>
                    
                    <p><strong>2. Risiko Trading</strong></p>
                    <p>Trading forex memiliki risiko kerugian. Hasil tidak dijamin 100% profit.</p>
                    
                    <p><strong>3. Biaya Jasa</strong></p>
                    <p>Fee jasa joki akan dipotong dari profit yang didapatkan.</p>
                    
                    <p><strong>4. Pembayaran</strong></p>
                    <p>Profit akan ditransfer ke rekening yang telah didaftarkan.</p>
                    
                    <p><strong>5. Durasi Trading</strong></p>
                    <p>Durasi trading sesuai paket yang dipilih, bisa diperpanjang dengan kesepakatan.</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // Dashboard link check
    const adminBtn = document.querySelector('.admin-btn');
    if (adminBtn) {
        adminBtn.addEventListener('click', function(e) {
            if (!localStorage.getItem('adminLoggedIn')) {
                e.preventDefault();
                const password = prompt('Masukkan password admin:');
                if (password === 'marketjoki123') {
                    localStorage.setItem('adminLoggedIn', 'true');
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Password salah!');
                }
            }
        });
    }
});
