class SuperFood extends Food {
    constructor(onTimeout) {
        super();
        this.element.className = 'dot super-food';
        
        this.timer = setTimeout(() => {
            this.remove();
            onTimeout();
        }, 3000);
    }

    remove() {
        clearTimeout(this.timer);
        super.remove();
    }
}