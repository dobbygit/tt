// This file contains API functions for the rental system

export interface RentalRequest {
  rentalType: string;
  duration: string;
  phoneNumber: string;
  email?: string;
  name?: string;
  startDate?: string;
  additionalNotes?: string;
}

/**
 * Submit a rental request to the backend
 */
export async function submitRentalRequest(
  data: RentalRequest,
): Promise<{ success: boolean; message: string }> {
  // In a real implementation, this would make an actual API call
  // For now, we'll simulate a successful response after a delay

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        resolve({
          success: true,
          message: "Rental request submitted successfully",
        });
      } else {
        reject(new Error("Network error"));
      }
    }, 1500);
  });
}

/**
 * Get available rental items from the backend
 */
export async function getAvailableRentalItems() {
  // In a real implementation, this would fetch data from an API
  // For now, we'll return hardcoded data

  return [
    {
      id: 1,
      name: "18x9m Marquee Tent",
      description:
        "Large-scale marquee tent perfect for grand weddings, exhibitions, and corporate events. Features sturdy aluminum frame and waterproof PVC covering.",
      image:
        "https://images.unsplash.com/photo-1478827387698-1527781a4887?w=800&q=80",
      dailyRate: "",
      weeklyRate: "",
      deposit: "",
      category: "tents",
      available: true,
    },
    {
      id: 2,
      name: "5x5m Events Tent",
      description:
        "Versatile medium-sized tent ideal for small events, parties, and outdoor functions. Easy to set up with professional finish.",
      image:
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
      dailyRate: "",
      weeklyRate: "",
      deposit: "",
      category: "tents",
      available: true,
    },
  ];
}

/**
 * Check availability for a specific rental item
 */
export async function checkRentalAvailability(
  itemId: number,
  startDate: string,
  endDate: string,
) {
  // In a real implementation, this would check against a database
  return { available: true };
}
