/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EventCoordinator {
  name: string;
  phone: string;
}

export interface SymposiumEvent {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  department: string;
  type: 'technical' | 'non-technical' | 'workshop' | 'gaming';
  date: string;
  time: string;
  venue: string;
  fee: number;
  teamSize: string;
  maxSeats: number;
  registeredCount: number;
  coordinators: EventCoordinator[];
  rules: string[];
  prizes: string[];
  image: string;
}

export interface Registration {
  id: string;
  eventId: string;
  eventTitle: string;
  participantName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  registrationDate: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  status: 'pending' | 'approved' | 'rejected';
  ticketCode: string;
  fee: number;
}

export interface Stats {
  totalEvents: number;
  totalRegistrations: number;
  pendingApprovals: number;
  totalRevenue: number;
}
