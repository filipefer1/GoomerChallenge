import { validateTime, validateObjectId } from "../../src/utils/validators";

describe("Validators", () => {
  it("should return a valid time finished on 00, 15, 30 or 45", () => {
    const time = validateTime("15:30");
    expect(time).toBeTruthy();
  });

  it("should throw an error because a invalid time was passed", () => {
    try {
      const time = validateTime("15:25");
    } catch (err) {
      expect(err.message).toBe("Hour format is invalid!")
      expect(err).toBeInstanceOf(Error)
    }
  })

  it("should return a valid object id", () => {
    const objectId = validateObjectId("5ef3b8a6a825e228280ef895");
    expect(objectId).toBeTruthy();
  });

  it("should return an error because an invalid object id was passed", () => {
    try {
      const objectId = validateObjectId("stringtest");
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toBe(
        "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters"
      );
    }
  });
});
