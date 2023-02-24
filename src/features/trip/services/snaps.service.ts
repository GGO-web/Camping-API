import { ISnap, Snap } from "../../../models/Snap.model";

export class SnapsService {
  public static getAllUserSnaps = async (userId: string) => {
    const snaps = await Snap.find({ userId });

    return snaps;
  };

  public static createTripSnap = async (snap: ISnap) => {
    const createdSnap = await Snap.create(snap);

    return createdSnap;
  };
}
