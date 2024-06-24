export interface Group {
  groupId: string;
  groupName: string;
  participantsCount: number;
  totalMessages: number;
  totalSizeKB: number;
  totalEmissionsOneByte: number;
  totalEmissionsSWD: number;
  lastReportTimestamp: string; // use string if this is coming as an ISO date string
  adminNames: string[];
  totalDonations: {
    // Define the structure of donationSchema if needed
  }[];
  limits: {
    hour: number;
    day: number;
    week: number;
    month: number;
    year: number;
  };
  lastReportLimitsCounter: {
    hour: number;
    day: number;
    week: number;
    month: number;
    year: number;
  };
}
