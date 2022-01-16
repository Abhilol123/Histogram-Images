class Population {
    constructor(total, old, best) {
        this.total = total;
        this.old = old;
        this.best = best;
    }

    pickOne() {
        let index = 0;
        let r = Math.random();
        while (r > 0) {
            r = r - this.old[index].fitness;
            index++;
        }
        index--;
        let selected = this.old[index];
        let new_system = new System(selected.nn);
        new_system.nn.mutate();
        return new_system;
    }

    calculateFitness() {
        let sum = 0;
        for (let i = 0; i < this.total; i++) {
            sum = sum + this.old[i].score;
        }
        for (let i = 0; i < this.total; i++) {
            this.old[i].fitness = this.old[i].score / sum;
        }
    }

    nextGen() {
        this.calculateFitness();
        let next_gen = []
        next_gen.push(new System(this.best.nn));
        for (let i = 0; i < this.total * 0.90; i++) {
            next_gen.push(this.pickOne());
        }
        for (let i = 0; i < this.total * 0.10 - 1; i++) {
            let new_control = new NN(best.nn.no_inp_nodes, best.nn.no_ans_nodes, best.nn.no_hidden_layers, best.nn.no_hidden_nodes);
            new_control.initialise();
            next_gen.push(new System(new_control));
        }
        return next_gen;
    }
}
