import { COLORS } from "../helpers/colors.ts";
/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */


interface hamburger {
    prepare: () => void;
}

interface drink {
    pour: () => void;
}


class cheeseburger implements hamburger {
    prepare() {
        console.log("Preparando una hamburguesa con %cqueso", COLORS.orange);
    }
}

class veggieBurger implements hamburger {
    prepare() {
        console.log("Preparando una hamburguesa %cvegetariana", COLORS.green);
    }
}

class cola implements drink {
    pour() {
        console.log("Sirviendo una bebida de %ccola", COLORS.red);
    }
}

class lemonade implements drink {
    pour() {
        console.log("Sirviendo una bebida de %climonada", COLORS.yellow);
    }
}

class fastFoodFactory {
    createHamburger(): hamburger {
        return new cheeseburger();
    }

    createDrink(): drink {
        return new cola();
    }
}

class healthyFoodFactory {
    createHamburger(): hamburger {
        return new veggieBurger();
    }

    createDrink(): drink {
        return new lemonade();
    }
}

function clientCode(factory: fastFoodFactory | healthyFoodFactory) {
    const hamburger = factory.createHamburger();
    const drink = factory.createDrink();

    switch (factory.constructor.name) {
        case "fastFoodFactory":
            console.log(
                "\n%cComida rápida seleccionada",
                COLORS.red
            );
            break;
        case "healthyFoodFactory":
            console.log(
                "\n%cComida saludable seleccionada",
                COLORS.green
            );
            break;
        default:
            break;
    }

    hamburger.prepare();
    drink.pour();
}

clientCode(new fastFoodFactory());
clientCode(new healthyFoodFactory());
