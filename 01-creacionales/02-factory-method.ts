/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */


interface Hamburger {
    prepare(): void;
}


class CheeseBurger implements Hamburger {
    prepare() {
        console.log('Preparando una hamburguesa con queso');
    }
}

class ChickenBurger implements Hamburger {
    prepare() {
        console.log('Preparando una hamburguesa de pollo');
    }
}

class BeanBurger implements Hamburger {
    prepare() { 
        console.log('Preparando una hamburguesa de frijoles');
    }   
}

abstract class Restaurant {
    protected abstract createHamburger(): Hamburger;

    orderHamburger() {
        const hamburger = this.createHamburger();
        hamburger.prepare();
    }
}

class CheeseBurgerRestaurant extends Restaurant {
    createHamburger(): Hamburger {
        return new CheeseBurger();
    }
}

class ChickenBurgerRestaurant extends Restaurant {
    createHamburger(): Hamburger {
        return new ChickenBurger();
    }
}

class BeanBurgerRestaurant extends Restaurant {
    createHamburger(): Hamburger {
        return new BeanBurger();
    }
}

function main(){

    let restaurant: Restaurant;
    const burgerType = prompt('¿Qué tipo de hamburguesa quieres? (chicken/cheese/bean)')?.toLowerCase();

    switch (burgerType) {
        case 'cheese':
            restaurant = new CheeseBurgerRestaurant();
            break;
        case 'chicken':
            restaurant = new ChickenBurgerRestaurant();
            break;
        case 'bean':
            restaurant = new BeanBurgerRestaurant();
            break;
        default:
            console.log('Tipo de hamburguesa no válido');
            return;
    }

    restaurant.orderHamburger();
}

main()


