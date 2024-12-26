//Generate Keys
async function generateKeyPair() {
    const keyPair = await window.crypto.subtle.generateKey({
        name: "RSA-OAEP",
        modulusLength: 2048, // can be 1024, 2048, or 4096
        publicExponent: new Uint8Array([1, 0, 1]), // 24-bit representation of 65537
        hash: {name: "SHA-256"}
    }, true, ["encrypt", "decrypt"]);

    return keyPair;
}

//Encrypt Message
async function encryptMessage(publicKey, message) {
    let encodedMessage = new TextEncoder().encode(message);
    let encryptedMessage = await window.crypto.subtle.encrypt(
        {name: "RSA-OAEP"},
        publicKey,
        encodedMessage
    );
    return encryptedMessage;
}

//Decrypt Message
async function decryptMessage(privateKey, encryptedMessage) {
    let decryptedMessage = await window.crypto.subtle.decrypt(
        {name: "RSA-OAEP"},
        privateKey,
        encryptedMessage
    );
    let decodedMessage = new TextDecoder().decode(decryptedMessage);
    return decodedMessage;
}

//Integration 
document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const keyPair = await generateKeyPair();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const encryptedMessage = await encryptMessage(keyPair.publicKey, message);

    // Here you would typically send the encryptedMessage to your server
    console.log("Encrypted message:", new Uint8Array(encryptedMessage));

    const decryptedMessage = await decryptMessage(keyPair.privateKey, encryptedMessage);
    console.log("Decrypted message:", decryptedMessage);
   
});