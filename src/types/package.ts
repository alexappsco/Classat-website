export interface IPackageSubscription {
    subscriptionId: string;
    teacherPackageId: string;
    teacherName: string;
    teacherImage: string;
    packageName: string;
    totalHours: number;
    remainingHours: number;
    startDate: string;
    endDate: string;
    isExpired: boolean;
    discountPercentage: number;
    reservedSessionsCount: number;
}