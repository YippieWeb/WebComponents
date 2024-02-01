// create template

const template = document.createElement('template');
template.innerHTML = `
    <style>
    .user-card {
        font-family: 'Arial', sans-serif;
        background: #f4f4f4;
        width: 500px;
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 10px;
        margin-bottom: 15px;
        border-bottom: darkorchid 5px solid;
    }

    .user-card img {
        width: 100%;
    }

    .user-card button {
        cursor: pointer;
        background: darkorchid;
        color: #fff;
        border: 0;
        border-radius: 5px;
        padding: 5px 10px;
    }
    </style>
    <div class="user-card">
        <img />
        <div>
            <h3></h3>
            <div class="info">
                <p><slot name="email"></slot></p>
                <p><slot name="phone" /></p>
            </div>
            <button id="toggle-info">Hide Info</button>
        </div>
    </div>
`;

// create custom element
class UserCard extends HTMLElement {
    constructor() {
        super();

        this.showInfo = true;

        // shadow DOM
        // self-contained components encapsulates styles and markup (not affected by global styling)
        // mode: open, allow access in chrome dev tools
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.
            cloneNode(true));

        // select name
        this.shadowRoot.querySelector('h3').innerText = 
        this.getAttribute('name');

        // select image
        this.shadowRoot.querySelector('img').src = 
        this.getAttribute('avatar');
    }

    toggleInfo() {
        this.showInfo = !this.showInfo;

        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

        // change the display of info and text on button
        if(this.showInfo) {
            info.style.display = 'block';
            toggleBtn.innerHTML = 'Hide info'
        } else {
            info.style.display = 'none';
            toggleBtn.innerHTML = 'Show info'
        }
    }

    // insert element into the DOM
    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').
        addEventListener('click', () => this.toggleInfo());
    }

    // remove element from the DOM
    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').
        removeEventListener();
    }
}

window.customElements.define('user-card', UserCard); // (tag, class-to-be-connected-to)