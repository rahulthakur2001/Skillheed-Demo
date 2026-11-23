import {
  Award,
  BadgeCheck,
  BarChart3,
  Bell,
  BookOpen,
  BookMarked,
  Bot,
  Briefcase,
  Building2,
  Bus,
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  ClipboardCheck,
  ClipboardList,
  Compass,
  Dumbbell,
  FileBarChart,
  FileCheck2,
  FileText,
  FlaskConical,
  GraduationCap,
  Handshake,
  HeartPulse,
  History,
  Home,
  IndianRupee,
  Landmark,
  LayoutDashboard,
  Lightbulb,
  Library,
  Map,
  Medal,
  Megaphone,
  MessageSquare,
  Package,
  PencilRuler,
  Repeat,
  Route,
  ScrollText,
  Settings,
  ShieldCheck,
  Swords,
  Target,
  Timer,
  Trophy,
  UserCheck,
  UserPlus,
  Users,
  UsersRound,
  Wallet,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export type WorkspaceType = "school" | "college" | "sports";

export interface NavItem {
  label: string;
  icon: LucideIcon;
}
export interface NavGroup {
  title: string;
  items: NavItem[];
}
export interface Stat {
  label: string;
  value: string;
  hint: string;
  action: string;
  icon: LucideIcon;
  progress?: number;
  trend?: string;
}
export interface CalendarEvent {
  day: number;
  title: string;
  tag: string;
}
export interface TableConfig {
  title: string;
  columns: string[];
  rows: string[][];
}

export interface WorkspaceConfig {
  type: WorkspaceType;
  label: string;
  shortCode: string;
  icon: LucideIcon;
  tagline: string;
  /** static Tailwind class sets so the compiler can see them */
  accent: {
    gradient: string;
    soft: string;
    text: string;
    ring: string;
    chart: string;
    chart2: string;
  };
  nav: NavGroup[];
  stats: Stat[];
  trend: { title: string; caption: string; data: { m: string; v: number }[] };
  bars: { title: string; caption: string; data: { name: string; v: number }[] };
  mix: { title: string; caption: string; data: { name: string; v: number }[] };
  commandCenter: { label: string; icon: LucideIcon; desc: string }[];
  calendar: CalendarEvent[];
  table: TableConfig;
}

const months = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
const series = (vals: number[]) => vals.map((v, i) => ({ m: months[i], v }));

export const WORKSPACES: Record<WorkspaceType, WorkspaceConfig> = {
  school: {
    type: "school",
    label: "School",
    shortCode: "GVS",
    icon: BookOpen,
    tagline: "Students, Teachers, Attendance, Fees",
    accent: {
      gradient: "from-blue-600 to-indigo-600",
      soft: "bg-blue-50",
      text: "text-blue-700",
      ring: "ring-blue-100",
      chart: "#2563eb",
      chart2: "#16a34a",
    },
    nav: [
      { title: "Dashboard", items: [{ label: "Dashboard", icon: LayoutDashboard }] },
      {
        title: "Academics",
        items: [
          { label: "Academic Planning", icon: CalendarRange },
          { label: "Exams & Assessment", icon: PencilRuler },
          { label: "Certificates", icon: Award },
          { label: "Learning Activities", icon: Lightbulb },
          { label: "Study Materials", icon: BookMarked },
          { label: "AI Teacher Assistant", icon: Bot },
        ],
      },
      {
        title: "Student Management",
        items: [
          { label: "Admissions", icon: UserPlus },
          { label: "Student Roster", icon: Users },
        ],
      },
      {
        title: "Mentoring & Careers",
        items: [
          { label: "Internship Tracking", icon: Compass },
          { label: "Mentor Matching", icon: Handshake },
          { label: "Learning Paths", icon: Route },
          { label: "Innovation Hub", icon: FlaskConical },
        ],
      },
      {
        title: "HR & Administration",
        items: [
          { label: "Teachers & Staff", icon: Building2 },
          { label: "Attendance", icon: CalendarCheck },
          { label: "Leave Management", icon: CalendarDays },
          { label: "Teacher Training", icon: GraduationCap },
        ],
      },
      {
        title: "Operations",
        items: [
          { label: "Fee Management", icon: IndianRupee },
          { label: "Transport", icon: Bus },
          { label: "Inventory", icon: Package },
          { label: "Payroll", icon: Briefcase },
          { label: "School Migration", icon: Repeat },
        ],
      },
      {
        title: "Community & Comms",
        items: [
          { label: "Communication", icon: Megaphone },
          { label: "Events & Notices", icon: Bell },
          { label: "Marketing", icon: BarChart3 },
        ],
      },
      {
        title: "Policy & Compliance",
        items: [
          { label: "NEP & NCrF", icon: FileText },
          { label: "Large-Scale Assessments", icon: ClipboardList },
          { label: "Cooperatives", icon: Handshake },
          { label: "SSSA", icon: Medal },
        ],
      },
      {
        title: "System",
        items: [
          { label: "Settings & Onboarding", icon: Settings },
          { label: "Audit Log", icon: History },
        ],
      },
    ],
    stats: [
      { label: "Total Students", value: "1,254", hint: "12 new admissions this month", action: "View list", icon: Users, trend: "+4.2%" },
      { label: "Active Staff", value: "82", hint: "Teaching & support", action: "View roster", icon: UserCheck, trend: "+2" },
      { label: "Fee Collection", value: "₹8,50,000", hint: "75% collected for this term", action: "Open fees", icon: Wallet, progress: 75 },
      { label: "Transport Active", value: "450", hint: "18 routes · GPS live", action: "Open transport", icon: Bus, trend: "18 routes" },
    ],
    trend: {
      title: "Admissions Trend",
      caption: "Last 12 months",
      data: series([42, 58, 51, 66, 49, 74, 85, 92, 78, 104, 96, 118]),
    },
    bars: {
      title: "Fee Collection by Term",
      caption: "Percent collected",
      data: [
        { name: "Term 1", v: 92 },
        { name: "Term 2", v: 84 },
        { name: "Term 3", v: 75 },
      ],
    },
    mix: {
      title: "Module Activity Mix",
      caption: "Based on recent events",
      data: [
        { name: "Attendance", v: 34 },
        { name: "Exams", v: 22 },
        { name: "Fees", v: 18 },
        { name: "Communication", v: 15 },
        { name: "Transport", v: 11 },
      ],
    },
    commandCenter: [
      { label: "Admissions", icon: UserPlus, desc: "38 applications pending review" },
      { label: "Attendance", icon: CalendarCheck, desc: "94.6% present today" },
      { label: "Exams & Assessment", icon: PencilRuler, desc: "Half-yearly exams from 2 Dec" },
      { label: "Fee Management", icon: IndianRupee, desc: "₹2.8L outstanding this term" },
      { label: "Transport", icon: Bus, desc: "All 18 routes on schedule" },
      { label: "Communication", icon: Megaphone, desc: "3 circulars scheduled" },
    ],
    calendar: [
      { day: 4, title: "PTM – Classes 6 to 8", tag: "Meeting" },
      { day: 14, title: "Children's Day Celebration", tag: "Event" },
      { day: 21, title: "Science Exhibition", tag: "Event" },
      { day: 26, title: "Unit Test – Mathematics", tag: "Exam" },
      { day: 28, title: "Fee due date – Term 3", tag: "Fees" },
    ],
    table: {
      title: "Recent Admissions",
      columns: ["Student", "Class", "Guardian", "Status"],
      rows: [
        ["Aarav Sharma", "Class 6-A", "Rakesh Sharma", "Approved"],
        ["Ananya Iyer", "Class 9-B", "Lakshmi Iyer", "Documents pending"],
        ["Mohammed Faiz", "Class 3-C", "Imran Khan", "Approved"],
        ["Kavya Reddy", "Class 11-Sci", "Suresh Reddy", "Interview"],
        ["Rohan Verma", "Class 1-A", "Neha Verma", "Approved"],
      ],
    },
  },

  college: {
    type: "college",
    label: "College",
    shortCode: "SXC",
    icon: GraduationCap,
    tagline: "Courses, Exams, Results, LMS",
    accent: {
      gradient: "from-violet-600 to-indigo-600",
      soft: "bg-violet-50",
      text: "text-violet-700",
      ring: "ring-violet-100",
      chart: "#7c3aed",
      chart2: "#4f46e5",
    },
    nav: [
      { title: "Dashboard", items: [{ label: "Dashboard", icon: LayoutDashboard }] },
      {
        title: "Academics",
        items: [
          { label: "Programs & Courses", icon: BookOpen },
          { label: "Timetable", icon: CalendarRange },
          { label: "LMS & Course Content", icon: Library },
          { label: "Assignments", icon: ClipboardCheck },
          { label: "Exams & Results", icon: FileCheck2 },
        ],
      },
      {
        title: "Students",
        items: [
          { label: "Admissions", icon: UserPlus },
          { label: "Student Records", icon: Users },
          { label: "Attendance", icon: CalendarCheck },
          { label: "Placements & Internships", icon: Briefcase },
          { label: "Alumni Network", icon: UsersRound },
        ],
      },
      {
        title: "Faculty & Research",
        items: [
          { label: "Faculty", icon: Building2 },
          { label: "Research & Publications", icon: FlaskConical },
          { label: "Leave Management", icon: CalendarDays },
          { label: "Payroll", icon: Wallet },
        ],
      },
      {
        title: "Finance & Campus",
        items: [
          { label: "Fee Management", icon: IndianRupee },
          { label: "Scholarships", icon: Award },
          { label: "Hostel", icon: Home },
          { label: "Library", icon: BookMarked },
          { label: "Transport", icon: Bus },
        ],
      },
      {
        title: "Accreditation",
        items: [
          { label: "NAAC & NIRF", icon: BadgeCheck },
          { label: "UGC / AICTE Reports", icon: FileBarChart },
          { label: "Academic Bank of Credits", icon: Landmark },
        ],
      },
      {
        title: "System",
        items: [
          { label: "Settings", icon: Settings },
          { label: "Audit Log", icon: History },
        ],
      },
    ],
    stats: [
      { label: "Enrolled Students", value: "8,420", hint: "Across 42 programs", action: "View records", icon: Users, trend: "+6.1%" },
      { label: "Faculty Members", value: "386", hint: "214 PhD holders", action: "View faculty", icon: GraduationCap, trend: "+11" },
      { label: "Fee Collection", value: "₹4.2 Cr", hint: "68% collected for this semester", action: "Open fees", icon: Wallet, progress: 68 },
      { label: "Placement Rate", value: "87%", hint: "Batch 2026 · 142 recruiters", action: "Open placements", icon: Briefcase, trend: "+5 pts" },
    ],
    trend: {
      title: "Average Semester Score",
      caption: "CGPA trend · last 12 months",
      data: series([6.9, 7.0, 7.1, 7.0, 7.2, 7.3, 7.2, 7.4, 7.5, 7.4, 7.6, 7.8]),
    },
    bars: {
      title: "Enrollment by Program",
      caption: "Current academic year",
      data: [
        { name: "B.Sc", v: 2450 },
        { name: "B.Com", v: 2120 },
        { name: "BA", v: 1680 },
        { name: "BCA", v: 1240 },
        { name: "M.Sc", v: 930 },
      ],
    },
    mix: {
      title: "Results Overview",
      caption: "Odd semester 2026",
      data: [
        { name: "Distinction", v: 22 },
        { name: "First class", v: 46 },
        { name: "Second class", v: 21 },
        { name: "Pass", v: 7 },
        { name: "Re-appear", v: 4 },
      ],
    },
    commandCenter: [
      { label: "Exams & Results", icon: FileCheck2, desc: "End-semester exams from 9 Dec" },
      { label: "LMS & Course Content", icon: Library, desc: "1,284 lectures published" },
      { label: "Placements & Internships", icon: Briefcase, desc: "12 drives this month" },
      { label: "Timetable", icon: CalendarRange, desc: "No clashes detected" },
      { label: "Scholarships", icon: Award, desc: "214 applications to verify" },
      { label: "NAAC & NIRF", icon: BadgeCheck, desc: "SSR draft 78% complete" },
    ],
    calendar: [
      { day: 3, title: "Infosys campus drive", tag: "Placement" },
      { day: 10, title: "Last date – assignment submission", tag: "Academic" },
      { day: 17, title: "National Science Symposium", tag: "Event" },
      { day: 24, title: "Practical exams begin", tag: "Exam" },
      { day: 29, title: "Semester fee due", tag: "Fees" },
    ],
    table: {
      title: "Upcoming Examinations",
      columns: ["Course", "Program", "Date", "Status"],
      rows: [
        ["Data Structures", "BCA Sem 3", "09 Dec 2026", "Paper ready"],
        ["Organic Chemistry", "B.Sc Sem 5", "10 Dec 2026", "Under moderation"],
        ["Financial Accounting", "B.Com Sem 1", "11 Dec 2026", "Paper ready"],
        ["Indian Polity", "BA Sem 3", "12 Dec 2026", "Setter assigned"],
        ["Machine Learning", "M.Sc Sem 3", "14 Dec 2026", "Paper ready"],
      ],
    },
  },

  sports: {
    type: "sports",
    label: "Sports Academy",
    shortCode: "CSA",
    icon: Trophy,
    tagline: "Players, Coaches, Teams, Tournaments",
    accent: {
      gradient: "from-emerald-600 to-teal-600",
      soft: "bg-emerald-50",
      text: "text-emerald-700",
      ring: "ring-emerald-100",
      chart: "#059669",
      chart2: "#f59e0b",
    },
    nav: [
      { title: "Dashboard", items: [{ label: "Dashboard", icon: LayoutDashboard }] },
      {
        title: "Athletes",
        items: [
          { label: "Players", icon: Users },
          { label: "Batches & Teams", icon: UsersRound },
          { label: "Performance Tracking", icon: Target },
          { label: "Fitness & Health", icon: HeartPulse },
        ],
      },
      {
        title: "Coaching",
        items: [
          { label: "Coaches", icon: UserCheck },
          { label: "Training Plans", icon: Dumbbell },
          { label: "Session Schedule", icon: Timer },
          { label: "Attendance", icon: CalendarCheck },
        ],
      },
      {
        title: "Competitions",
        items: [
          { label: "Tournaments", icon: Trophy },
          { label: "Matches & Fixtures", icon: Swords },
          { label: "Results & Rankings", icon: BarChart3 },
          { label: "Achievements", icon: Medal },
        ],
      },
      {
        title: "Operations",
        items: [
          { label: "Fees & Memberships", icon: IndianRupee },
          { label: "Facilities & Booking", icon: Map },
          { label: "Equipment Inventory", icon: Warehouse },
          { label: "Payroll", icon: Wallet },
        ],
      },
      {
        title: "Community",
        items: [
          { label: "Parents Portal", icon: MessageSquare },
          { label: "Announcements", icon: Megaphone },
          { label: "Sponsors", icon: ShieldCheck },
        ],
      },
      {
        title: "System",
        items: [
          { label: "Settings", icon: Settings },
          { label: "Audit Log", icon: ScrollText },
        ],
      },
    ],
    stats: [
      { label: "Active Players", value: "640", hint: "24 batches · 6 sports", action: "View players", icon: Users, trend: "+38" },
      { label: "Coaches", value: "38", hint: "12 certified Level-2", action: "View coaches", icon: UserCheck, trend: "+3" },
      { label: "Membership Revenue", value: "₹18.6 L", hint: "82% renewals collected", action: "Open fees", icon: Wallet, progress: 82 },
      { label: "Upcoming Tournaments", value: "6", hint: "Next: State Cricket U-16", action: "View fixtures", icon: Trophy, trend: "Dec 6" },
    ],
    trend: {
      title: "Training Attendance",
      caption: "Average % · last 12 months",
      data: series([78, 81, 79, 84, 86, 83, 88, 90, 87, 91, 89, 93]),
    },
    bars: {
      title: "Players by Sport",
      caption: "Active registrations",
      data: [
        { name: "Cricket", v: 210 },
        { name: "Football", v: 160 },
        { name: "Badminton", v: 110 },
        { name: "Athletics", v: 85 },
        { name: "Swimming", v: 75 },
      ],
    },
    mix: {
      title: "Medal Tally 2026",
      caption: "District, State & National",
      data: [
        { name: "Gold", v: 28 },
        { name: "Silver", v: 35 },
        { name: "Bronze", v: 41 },
      ],
    },
    commandCenter: [
      { label: "Session Schedule", icon: Timer, desc: "46 sessions today" },
      { label: "Tournaments", icon: Trophy, desc: "6 upcoming, 2 registrations open" },
      { label: "Performance Tracking", icon: Target, desc: "128 assessments due" },
      { label: "Fitness & Health", icon: HeartPulse, desc: "4 players in rehab" },
      { label: "Facilities & Booking", icon: Map, desc: "Turf 2 booked till 9 PM" },
      { label: "Fees & Memberships", icon: IndianRupee, desc: "58 renewals due this week" },
    ],
    calendar: [
      { day: 6, title: "State Cricket U-16 – Round 1", tag: "Tournament" },
      { day: 12, title: "Fitness assessment – all batches", tag: "Training" },
      { day: 18, title: "Inter-academy Football League", tag: "Match" },
      { day: 22, title: "Parents orientation", tag: "Meeting" },
      { day: 30, title: "Annual Sports Awards", tag: "Event" },
    ],
    table: {
      title: "Upcoming Fixtures",
      columns: ["Match", "Team", "Venue", "Status"],
      rows: [
        ["CSA vs Royal Strikers", "Cricket U-16", "Home Ground", "Confirmed"],
        ["CSA FC vs City United", "Football U-14", "Turf 1", "Confirmed"],
        ["District Badminton Open", "Singles U-17", "Indoor Hall", "Entries sent"],
        ["State Athletics Meet", "Sprint Squad", "Sports Complex", "Travel booked"],
        ["CSA vs Falcons", "Cricket U-19", "Away", "Awaiting schedule"],
      ],
    },
  },
};

export const WORKSPACE_LIST = Object.values(WORKSPACES);
