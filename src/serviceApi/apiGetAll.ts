import axiosClientAuth from "./http-common";
import { Group } from "../types/Group"; // Adjust the path as necessary

export async function getAll(path: string, jwtToken: string): Promise<Group[]> {
  try {
    const response = await axiosClientAuth.get(path, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    console.log("response.data.data :", response.data.data);
    console.log(response, "response");
    return response.data.data.data as Group[]; // Ensure the data is cast to Group[]
  } catch (error) {
    console.error(error);
    throw new Error("Error in the request");
  }
}
