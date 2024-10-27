

import "@testing-library/jest-dom";

function add(a: number, b: number) {
  return a + b;
}

describe("Add two numbers", () => {
  it("should add 2 + 3", () => {
    // Arrange
    const a = 2;
    const b = 3;
    const expectedValue = 5;

    // Act
    const result = add(a, b);

    // Assert
    expect(result).toBe(expectedValue);
  
  });
});
