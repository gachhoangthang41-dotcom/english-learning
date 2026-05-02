"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Users,
  Search,
  UserPlus,
  MessageCircle,
  GraduationCap,
  Sparkles,
  ChevronLeft
} from "lucide-react";
import { ThemeToggle } from '@/views/components/theme-toggle';
import { NotificationBell } from '@/views/components/notification-bell';
import { useLanguage } from '@/views/components/language-provider';

type CommunityUser = {
  id: string;
  displayName?: string | null;
  username?: string;
  avatarUrl?: string | null;
  learnedWordsCount: number;
  createdAt: string;
  level?: {
    code: string;
    name: string;
  } | null;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function FriendsPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  
  const [users, setUsers] = React.useState<CommunityUser[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/friends", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
        });
        const data = await res.json().catch(() => null);
        if (!alive) return;
        
        if (res.ok && data?.status === "success") {
          setUsers(data.users || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    
    return () => { alive = false; };
  }, []);

  const filteredUsers = users.filter((u) => {
    if (!searchTerm) return true;
    const name = u.displayName || u.username || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const pageTitle = language === "vi" ? "Cộng đồng" : "Community";
  const pageSubtitle = language === "vi" ? "Kết bạn và giao lưu với những người cùng học" : "Make friends and interact with other learners";
  const searchPlaceholder = language === "vi" ? "Tìm kiếm bạn bè..." : "Search for friends...";
  const addFriend = language === "vi" ? "Kết bạn" : "Add Friend";
  const message = language === "vi" ? "Nhắn tin" : "Message";

  return (
    <div className="min-h-screen bg-background text-foreground antialiased transition-colors duration-300 flex flex-col">
      {/* HEADER */}
      <header className="shrink-0 sticky top-0 z-[200] overflow-visible bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/home")}
              className="size-9 rounded-xl bg-secondary border border-transparent hover:brightness-95 transition grid place-items-center"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <Link href="/home" className="flex items-center gap-3 select-none">
              <div className="size-9 rounded-xl bg-blue-600/10 ring-1 ring-border grid place-items-center">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="font-extrabold tracking-tight text-foreground hidden sm:block">
                {pageTitle}
              </h1>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <NotificationBell />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 size-[500px] rounded-full bg-blue-500/10 dark:bg-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 size-[500px] rounded-full bg-purple-500/10 dark:bg-purple-600/5 blur-[120px]" />
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-8 space-y-8">
          
          {/* HERO SECTION */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 shadow-xl shadow-purple-500/20">
            <div className="absolute -top-24 -left-24 size-[380px] rounded-full bg-white/20 blur-[90px]" />
            <div className="absolute -bottom-28 -right-24 size-[420px] rounded-full bg-pink-300/30 blur-[100px]" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
                  {pageTitle}
                </h2>
                <p className="text-white/90 text-lg">
                  {pageSubtitle}
                </p>
              </div>
              <div className="hidden md:block">
                <div className="size-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30">
                  <Sparkles className="w-10 h-10 text-yellow-300" />
                </div>
              </div>
            </div>
          </section>

          {/* SEARCH AND FILTERS */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:-muted-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>

          {/* USERS GRID */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-3xl border border-border">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-foreground">Không tìm thấy người dùng</h3>
              <p className="text-muted-foreground mt-2">Thử một từ khóa tìm kiếm khác</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredUsers.map((user) => (
                <div key={user.id} className="group rounded-2xl bg-card border border-border p-5 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col items-center text-center space-y-4">
                    
                    {/* Avatar */}
                    <div className="relative">
                      <div className="size-20 rounded-full bg-secondary ring-4 ring-background overflow-hidden relative shadow-inner group-hover:ring-blue-100 dark:group-hover:ring-blue-900/30 transition-all">
                        {user.avatarUrl ? (
                          <Image
                            src={user.avatarUrl}
                            alt="Avatar"
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 text-slate-500 dark:text-slate-400 text-2xl font-bold">
                            {(user.displayName || user.username || "U").charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      
                      {/* Badge level */}
                      {user.level && (
                        <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-background shadow-sm">
                          {user.level.code}
                        </div>
                      )}
                    </div>
                    
                    {/* Info */}
                    <div className="w-full">
                      <h3 className="font-extrabold text-lg text-foreground truncate">
                        {user.displayName || user.username}
                      </h3>
                      {user.username && user.displayName && (
                        <div className="text-sm text-muted-foreground truncate">@{user.username}</div>
                      )}
                      
                      <div className="flex items-center justify-center gap-1 mt-2 text-sm text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-500/10 w-max mx-auto px-3 py-1 rounded-full">
                        <GraduationCap className="w-4 h-4" />
                        <span>{user.learnedWordsCount} {language === "vi" ? "từ đã học" : "words"}</span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="w-full flex items-center space-x-2 pt-2">
                       <button
                         onClick={(e) => { e.stopPropagation(); alert(language === "vi" ? "Đã gửi lời mời!" : "Friend request sent!"); }}
                         className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-1 shadow-md shadow-blue-500/20"
                       >
                         <UserPlus className="w-4 h-4" />
                         <span>{addFriend}</span>
                       </button>
                       <button
                         onClick={(e) => { e.stopPropagation(); alert(language === "vi" ? "Sắp ra mắt" : "Coming soon"); }}
                         className="flex-1 py-2 px-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-sm transition-colors flex items-center justify-center gap-1"
                       >
                         <MessageCircle className="w-4 h-4" />
                         <span>{message}</span>
                       </button>
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* BOTTOM SPACING */}
          <div className="h-10" />
        </div>
      </main>
    </div>
  );
}
