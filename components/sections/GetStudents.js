"use client";
import React, { useEffect, useState } from "react";
import {
  User,
  GraduationCap,
  MapPin,
  Home,
  Calendar,
  Clock,
  Phone,
  Mail,
  BookOpen,
  ChevronRight,
  Filter,
  Search,
  Grid,
  List,
} from "lucide-react";

export default function GetStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'list'
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://tutorwalabackend.onrender.com/api/student/students"
        );
        const data = await res.json();
        setStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const formatPhone = (phone) => {
    return phone ? phone : "+91 98765 43210";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600 mx-auto mb-6"></div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Loading Applications
          </h3>
          <p className="text-slate-600">Fetching student data...</p>
        </div>
      </div>
    );
  }

  const StudentCard = ({ student, index }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden group hover:-translate-y-1">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-600 px-6 py-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
              <span className="text-white font-bold text-lg">
                #{(index + 1).toString().padStart(3, "0")}
              </span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">
                {student.name}
              </h3>
              <p className="text-emerald-100 text-sm font-medium">
                ID: {student._id.slice(-8).toUpperCase()}
              </p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
            <div className="text-white text-right">
              <p className="text-xs text-emerald-100 mb-1">Monthly Fee</p>
              <p className="font-bold text-lg">₹3,500</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Main Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <InfoItem
              icon={<GraduationCap className="h-5 w-5" />}
              label="Class & Board"
              value={`${student.class} - ${student.board.toUpperCase()}`}
            />
            <InfoItem
              icon={<Home className="h-5 w-5" />}
              label="Mode"
              value={student.home === "Yes" ? "Home Tuition" : "Online Classes"}
            />
            <InfoItem
              icon={<MapPin className="h-5 w-5" />}
              label="Location"
              value={student.city}
            />
          </div>
          <div className="space-y-4">
            <InfoItem
              icon={<Clock className="h-5 w-5" />}
              label="Preferred Time"
              value={student.time}
            />
            <InfoItem
              icon={<Calendar className="h-5 w-5" />}
              label="Applied Date"
              value={formatDate(student.date)}
            />
            <InfoItem
              icon={<Phone className="h-5 w-5" />}
              label="Contact"
              value={formatPhone(student.phone)}
            />
          </div>
        </div>

        {/* Address */}
        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="bg-emerald-100 p-2 rounded-lg flex-shrink-0 mt-1">
              <MapPin className="h-4 w-4 text-emerald-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-600 mb-1">
                Full Address
              </p>
              <p className="text-slate-800 leading-relaxed">
                {student.address}
              </p>
            </div>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="h-3 w-3 bg-amber-400 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 h-3 w-3 bg-amber-400 rounded-full animate-ping opacity-30"></div>
            </div>
            <span className="text-sm font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
              Pending Review
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl">
              <BookOpen className="h-4 w-4" />
              <span>View Details</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-3">
      <div className="bg-emerald-100 p-2.5 rounded-xl flex-shrink-0">
        <div className="text-emerald-700">{icon}</div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
          {label}
        </p>
        <p className="font-semibold text-slate-800 truncate">{value}</p>
      </div>
    </div>
  );

  const StudentListItem = ({ student, index }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200 p-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="bg-emerald-100 text-emerald-700 font-bold rounded-lg px-3 py-2 text-sm">
            #{(index + 1).toString().padStart(3, "0")}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 mb-1">
              {student.name}
            </h3>
            <p className="text-sm text-slate-600">
              {student.class} - {student.board.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-slate-600">
            <MapPin className="h-4 w-4" />
            <span>{student.city}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600">
            <Home className="h-4 w-4" />
            <span>{student.home === "Yes" ? "Home" : "Online"}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(student.date)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            Details
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            Contact
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Student Applications
              </h1>
              <p className="text-slate-600">
                Manage and review {filteredStudents.length} student tuition
                requests
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full sm:w-64 transition-colors"
                />
              </div> */}

              {/* <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("card")}
                  className={`p-2.5 rounded-xl transition-colors ${
                    viewMode === "card"
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 rounded-xl transition-colors ${
                    viewMode === "list"
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <GraduationCap className="mx-auto h-20 w-20 text-slate-400 mb-6" />
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {searchTerm ? "No matching students" : "No applications found"}
              </h3>
              <p className="text-slate-600">
                {searchTerm
                  ? "Try adjusting your search criteria to find students."
                  : "No student applications are available at the moment."}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition-colors font-medium"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        ) : (
          <div
            className={
              viewMode === "card"
                ? "grid grid-cols-1 xl:grid-cols-2 gap-8"
                : "space-y-4"
            }
          >
            {filteredStudents.map((student, index) =>
              viewMode === "card" ? (
                <StudentCard
                  key={student._id}
                  student={student}
                  index={index}
                />
              ) : (
                <StudentListItem
                  key={student._id}
                  student={student}
                  index={index}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
