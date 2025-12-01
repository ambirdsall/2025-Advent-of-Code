import * as fs from "fs";

const input = fs.readFileSync("input.txt", "utf8");

// because every line of input ends with a newline, there's an empty string after the
// final newline's split; the slice removes it
const rotationList = input.split("\n").slice(0, -1);

type Direction = "L" | "R";

const dial = {
  value: 50,
  zerosSeen: 0,
  leftClick() {
    this.value = this.value <= 0 ? 99 : this.value - 1;

    // part 2
    if (this.value === 0) this.zerosSeen++;

    return this.value;
  },
  rightClick() {
    this.value = this.value >= 99 ? 0 : this.value + 1;

    // part 2
    if (this.value === 0) this.zerosSeen++;

    return this.value;
  },
  left(clickCount: number) {
    for (let i = 0; i < clickCount; i++) this.leftClick();

    // part 1
    // if (this.value === 0) this.zerosSeen++;

    return this.value;
  },
  right(clickCount: number) {
    for (let i = 0; i < clickCount; i++) this.rightClick();

    // part 1
    // if (this.value === 0) this.zerosSeen++;

    return this.value;
  },
  processRotation(rotation: string) {
    const [_rotation, directionStr, distanceStr] =
      rotation.match(/(L|R)(\d+)/) || [];

    // if the regex matches, the type matches too
    const direction: Direction = directionStr as Direction;
    const distance = parseInt(distanceStr || "");
    if (!(direction && distance))
      throw new Error(`how do I parse the rotation "${rotation}"?`);

    switch (direction) {
      case "L":
        this.left(distance);
        break;
      case "R":
        this.right(distance);
        break;
    }

    return this.value;
  },
};

for (let i = 0; i < rotationList.length; i++) {
  let postRotationValue;
  try {
    postRotationValue = dial.processRotation(rotationList[i]);
  } catch (err) {
    console.error("problem with rotation ", i, ": ", rotationList[i]);
    throw err;
  }
}
console.log(dial.zerosSeen);
