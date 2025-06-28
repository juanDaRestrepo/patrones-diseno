/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

class Computer {
    constructor(
        public cpu: string,
        public ram: string,
        public storage: string,
        public gpu?: string,
    ) {}
    
    public displayConfiguration() {
        return `Computer with: 
        - CPU: ${this.cpu}. 
        - RAM: ${this.ram}. 
        - Storage: ${this.storage} 
        - GPU: ${this.gpu}`;
    }
}

class ComputerBuilder {
    private cpu: string;
    private ram: string;
    private storage: string;
    private gpu?: string;

    constructor() {
        this.cpu = '';
        this.ram = '';
        this.storage = '';
        this.gpu = undefined;
    }

    public setCPU(cpu: string): ComputerBuilder {
        this.cpu = cpu;
        return this;
    }
    public setRAM(ram: string): ComputerBuilder {
        this.ram = ram;
        return this;
    }
    public setStorage(storage: string): ComputerBuilder {
        this.storage = storage;
        return this;
    }
    public setGPU(gpu: string): ComputerBuilder {
        this.gpu = gpu;
        return this;
    }
    public build(): Computer {
        return new Computer(this.cpu, this.ram, this.storage, this.gpu);
    }
}

const computer = new ComputerBuilder()
    .setCPU('Intel i7')
    .setRAM('16GB')
    .setStorage('1TB SSD')
    .setGPU('NVIDIA RTX 3080')
    .build();

console.log(computer.displayConfiguration()); // Computer with CPU: Intel i7, RAM: 16GB, Storage: 1TB SSD, GPU: NVIDIA RTX 3080

const gamerComputer = new ComputerBuilder()
    .setCPU('AMD Ryzen 9')
    .setRAM('32GB')
    .setRAM('82GB')
    .setStorage('2TB SSD')
    .setGPU('NVIDIA RTX 3090')
    .build();

console.log(gamerComputer.displayConfiguration()); // Computer with CPU: AMD Ryzen 9, RAM: 32GB, Storage: 2TB SSD, GPU: NVIDIA RTX 3090
