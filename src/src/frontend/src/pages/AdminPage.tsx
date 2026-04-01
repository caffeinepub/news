import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Pin,
  Plus,
  RefreshCw,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import SiteHeader from "../components/SiteHeader";
import {
  type Article,
  Category,
  useAddManualArticle,
  useDeleteArticle,
  useGetArticles,
  useRefreshNews,
  useSetFeatured,
  useSetPinned,
} from "../hooks/useQueries";

const ADMIN_PASSWORD = "news@admin2024";
const CATEGORY_OPTIONS = Object.values(Category);

function formatCat(cat: unknown): string {
  if (typeof cat === "string") return cat;
  if (typeof cat === "object" && cat !== null) return Object.keys(cat)[0] ?? "";
  return "";
}

function AdminPasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError("Galat password. Dobara koshish karein.");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-sm mx-4">
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center mb-3">
              <Lock size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Password daalo access ke liye
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="admin-password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Admin password"
                  className="pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && (
                <p className="text-sm text-destructive mt-1">{error}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage({ onBack }: { onBack: () => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AdminPasswordGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  return <AdminPanelContent onBack={onBack} />;
}

function AdminPanelContent({ onBack }: { onBack: () => void }) {
  const { data: articles, isLoading } = useGetArticles(null, 50);
  const refreshMutation = useRefreshNews();
  const setFeaturedMutation = useSetFeatured();
  const setPinnedMutation = useSetPinned();
  const deleteMutation = useDeleteArticle();
  const addMutation = useAddManualArticle();
  const [addOpen, setAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: "",
    summary: "",
    url: "",
    source: "",
    imageUrl: "",
    category: Category.pakistan,
    isFeatured: false,
    isPinned: false,
    publishedAt: BigInt(Date.now()) * BigInt(1_000_000),
  });

  const handleRefresh = async () => {
    try {
      await refreshMutation.mutateAsync();
      toast.success("News refreshed!");
    } catch (e: unknown) {
      toast.error(
        `Refresh failed: ${e instanceof Error ? e.message : "Unknown error"}`,
      );
    }
  };

  const handleAddArticle = async () => {
    if (!newArticle.title || !newArticle.url) {
      toast.error("Title and URL are required");
      return;
    }
    try {
      await addMutation.mutateAsync(newArticle as Article);
      toast.success("Article added!");
      setAddOpen(false);
      setNewArticle({
        title: "",
        summary: "",
        url: "",
        source: "",
        imageUrl: "",
        category: Category.pakistan,
        isFeatured: false,
        isPinned: false,
        publishedAt: BigInt(Date.now()) * BigInt(1_000_000),
      });
    } catch (e: unknown) {
      toast.error(
        `Add failed: ${e instanceof Error ? e.message : "Unknown error"}`,
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader onNavigate={() => {}} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              data-ocid="admin.back.button"
            >
              <ArrowLeft size={16} className="mr-1" /> Back to Site
            </Button>
            <h1 className="font-condensed font-bold text-2xl uppercase text-foreground">
              Admin Panel
            </h1>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleRefresh}
              disabled={refreshMutation.isPending}
              className="bg-navy hover:bg-navy-dark text-white"
              data-ocid="admin.refresh.button"
            >
              {refreshMutation.isPending ? (
                <Loader2 size={16} className="mr-2 animate-spin" />
              ) : (
                <RefreshCw size={16} className="mr-2" />
              )}
              Refresh News
            </Button>
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  data-ocid="admin.add.open_modal_button"
                >
                  <Plus size={16} className="mr-2" /> Add Article
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg" data-ocid="admin.add.dialog">
                <DialogHeader>
                  <DialogTitle>Add Manual Article</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 py-2">
                  <div>
                    <Label htmlFor="art-title">Title *</Label>
                    <Input
                      id="art-title"
                      value={newArticle.title ?? ""}
                      onChange={(e) =>
                        setNewArticle((p) => ({ ...p, title: e.target.value }))
                      }
                      placeholder="Article headline"
                      data-ocid="admin.add.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="art-summary">Summary</Label>
                    <Textarea
                      id="art-summary"
                      value={newArticle.summary ?? ""}
                      onChange={(e) =>
                        setNewArticle((p) => ({
                          ...p,
                          summary: e.target.value,
                        }))
                      }
                      placeholder="Article summary"
                      rows={3}
                      data-ocid="admin.add.textarea"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="art-url">URL *</Label>
                      <Input
                        id="art-url"
                        value={newArticle.url ?? ""}
                        onChange={(e) =>
                          setNewArticle((p) => ({ ...p, url: e.target.value }))
                        }
                        placeholder="https://..."
                        data-ocid="admin.add.input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="art-source">Source</Label>
                      <Input
                        id="art-source"
                        value={newArticle.source ?? ""}
                        onChange={(e) =>
                          setNewArticle((p) => ({
                            ...p,
                            source: e.target.value,
                          }))
                        }
                        placeholder="e.g. Dawn News"
                        data-ocid="admin.add.input"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="art-img">Image URL</Label>
                    <Input
                      id="art-img"
                      value={newArticle.imageUrl ?? ""}
                      onChange={(e) =>
                        setNewArticle((p) => ({
                          ...p,
                          imageUrl: e.target.value,
                        }))
                      }
                      placeholder="https://..."
                      data-ocid="admin.add.input"
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select
                      value={formatCat(newArticle.category)}
                      onValueChange={(val) =>
                        setNewArticle((p) => ({
                          ...p,
                          category: val as Category,
                        }))
                      }
                    >
                      <SelectTrigger data-ocid="admin.add.select">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORY_OPTIONS.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c.charAt(0).toUpperCase() + c.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={newArticle.isFeatured ?? false}
                        onCheckedChange={(v) =>
                          setNewArticle((p) => ({ ...p, isFeatured: v }))
                        }
                        data-ocid="admin.add.switch"
                      />
                      <Label>Featured</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={newArticle.isPinned ?? false}
                        onCheckedChange={(v) =>
                          setNewArticle((p) => ({ ...p, isPinned: v }))
                        }
                        data-ocid="admin.add.switch"
                      />
                      <Label>Pinned</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setAddOpen(false)}
                    data-ocid="admin.add.cancel_button"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddArticle}
                    disabled={addMutation.isPending}
                    className="bg-red-600 text-white"
                    data-ocid="admin.add.submit_button"
                  >
                    {addMutation.isPending ? (
                      <Loader2 size={14} className="mr-2 animate-spin" />
                    ) : null}
                    Add Article
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div
          className="bg-card border border-border rounded-sm overflow-x-auto"
          data-ocid="admin.table"
        >
          {isLoading ? (
            <div className="p-6 space-y-3" data-ocid="admin.loading_state">
              {["a", "b", "c", "d", "e"].map((k) => (
                <Skeleton key={k} className="h-12" />
              ))}
            </div>
          ) : !articles || articles.length === 0 ? (
            <div
              className="p-12 text-center text-muted-foreground"
              data-ocid="admin.empty_state"
            >
              <p className="text-lg font-medium">No articles yet.</p>
              <p className="text-sm mt-1">
                Click "Refresh News" to fetch live news or add a manual article.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-red-600 hover:bg-red-700">
                  <TableHead className="text-white font-semibold">
                    Title
                  </TableHead>
                  <TableHead className="text-white font-semibold w-24">
                    Category
                  </TableHead>
                  <TableHead className="text-white font-semibold w-24">
                    Source
                  </TableHead>
                  <TableHead className="text-white font-semibold w-20 text-center">
                    Featured
                  </TableHead>
                  <TableHead className="text-white font-semibold w-20 text-center">
                    Pinned
                  </TableHead>
                  <TableHead className="text-white font-semibold w-24 text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article, i) => {
                  const artId = BigInt(i);
                  return (
                    <TableRow
                      key={article.title}
                      className="hover:bg-muted/50"
                      data-ocid={`admin.row.${i + 1}`}
                    >
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="font-medium text-sm line-clamp-1">
                            {article.title}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {article.source}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-700 border-none text-xs">
                          {formatCat(article.category)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {article.source}
                      </TableCell>
                      <TableCell className="text-center">
                        <button
                          type="button"
                          onClick={() => setFeaturedMutation.mutate(artId)}
                          className={`hover:text-yellow-500 transition-colors ${article.isFeatured ? "text-yellow-500" : "text-muted-foreground"}`}
                          title="Set as featured"
                          data-ocid={`admin.featured.toggle.${i + 1}`}
                        >
                          <Star
                            size={16}
                            fill={article.isFeatured ? "currentColor" : "none"}
                          />
                        </button>
                      </TableCell>
                      <TableCell className="text-center">
                        <button
                          type="button"
                          onClick={() =>
                            setPinnedMutation.mutate({
                              id: artId,
                              pinned: !article.isPinned,
                            })
                          }
                          className={`hover:text-red-600 transition-colors ${article.isPinned ? "text-red-600" : "text-muted-foreground"}`}
                          title="Toggle pin"
                          data-ocid={`admin.pinned.toggle.${i + 1}`}
                        >
                          <Pin
                            size={16}
                            fill={article.isPinned ? "currentColor" : "none"}
                          />
                        </button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Dialog
                          open={deleteId === artId}
                          onOpenChange={(open) =>
                            setDeleteId(open ? artId : null)
                          }
                        >
                          <DialogTrigger asChild>
                            <button
                              type="button"
                              className="text-muted-foreground hover:text-destructive transition-colors"
                              data-ocid={`admin.delete_button.${i + 1}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </DialogTrigger>
                          <DialogContent data-ocid="admin.delete.dialog">
                            <DialogHeader>
                              <DialogTitle>Delete Article</DialogTitle>
                            </DialogHeader>
                            <p className="text-sm text-muted-foreground">
                              Are you sure you want to delete "{article.title}"?
                              This cannot be undone.
                            </p>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setDeleteId(null)}
                                data-ocid="admin.delete.cancel_button"
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={async () => {
                                  try {
                                    await deleteMutation.mutateAsync(artId);
                                    toast.success("Article deleted");
                                  } catch {
                                    toast.error("Delete failed");
                                  }
                                  setDeleteId(null);
                                }}
                                disabled={deleteMutation.isPending}
                                data-ocid="admin.delete.confirm_button"
                              >
                                {deleteMutation.isPending ? (
                                  <Loader2
                                    size={14}
                                    className="mr-2 animate-spin"
                                  />
                                ) : null}
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
}
