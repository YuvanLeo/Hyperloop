class Passenger {
  constructor(name, age, destination) {
      this.name = name;
      this.age = age;
      this.destination = destination;
  }
}

class Route {
  constructor(source, destination, distance) {
      this.source = source;
      this.destination = destination;
      this.distance = distance;
  }
}

class HyperloopSystem {
  constructor(startingStation) {
      this.routes = new Map();
      this.startingStation = startingStation;
      this.passengerQueue = [];
  }

  addRoute(source, destination, distance) {
      this.routes.set(source + destination, distance);
      
  }


  addPassenger(name, age, destination) {
      const passenger = new Passenger(name, age, destination);
      this.passengerQueue.push(passenger);
  }

  startPod(numPassengers) {
      const sortedQueue = this.passengerQueue.sort((a, b) => b.age - a.age);
      const podPassengers = sortedQueue.splice(0, numPassengers);

      podPassengers.forEach(passenger => {
          const route = this.findShortestRoute(passenger.destination);
          console.log(`${passenger.name} ${route}`);
      });

      this.passengerQueue = this.passengerQueue.filter(passenger => !podPassengers.includes(passenger));
  }

  findShortestRoute(destination) {
      let shortestRoute = 100;
      let shortestDistance = 250  ;

      for (const [sourceDest, distance] of this.routes.entries()) {
          const [source, dest] = sourceDest.split('');
          if (source === this.startingStation && dest === destination) {
              if (distance < shortestDistance) {
                  shortestDistance = distance;
                  shortestRoute = dest;
              }
          }
      }
    return shortestRoute;
  }
  printQueue() {
      console.log(this.passengerQueue.length);
      this.passengerQueue.forEach(passenger => {
          console.log(`${passenger.name} ${passenger.age}`);
      });
  }
}

const hyperloop = new HyperloopSystem('B');
hyperloop.addRoute('A', 'B', 3);
hyperloop.addRoute('A', 'C', 7);
hyperloop.addRoute('B', 'D', 2);
hyperloop.addRoute('B', 'C', 2);
hyperloop.addRoute('B', 'E', 5);
hyperloop.addRoute('C', 'E', 1);
hyperloop.addRoute('D', 'E', 3);

hyperloop.addPassenger('RAVI', 22, 'C');
hyperloop.addPassenger('HARI', 33, 'D');
hyperloop.addPassenger('KATHIR', 22, 'A');


hyperloop.startPod(1);
hyperloop.printQueue();