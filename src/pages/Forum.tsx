import {
  IonAvatar,
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonMenu,
  IonMenuButton,
  IonModal,
  IonNote,
  IonPage,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  logInOutline,
  caretForward,
  addOutline,
  alertCircleOutline,
  arrowUpOutline,
  chatbubbleOutline,
  closeOutline,
  timeOutline,
  add,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import Menu1 from "../components/Menu1";
import { Link } from "react-router-dom";
import flag from "../images/flag.jpg";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  upvotes: number;
  comments: number;
  category: "scam" | "phishing" | "hacking" | "other";
}
const Forum: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | ForumPost["category"]
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useIonViewWillEnter(() => {
    // Simulate loading data
    setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  });
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "CyberAlert_Post"));
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(dataArray);
    };
    fetchData();
  }, []);
  const handleStoreInfo = async () => {
    if (newPostTitle !== "" && newPostContent !== "") {
      try {
        const docRef = await addDoc(collection(db, "CyberAlert_Post"), {
          field1: newPostTitle,
          field2: newPostContent,
          timestamp: serverTimestamp(),
        });
        console.log("transcript written with ID:", docRef.id);
      } catch (e) {
        console.error("Error adding transcript:", e);
      }
    }
  };
  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    handleStoreInfo();
    const newPost: ForumPost = {
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      author: "You",
      authorAvatar: "https://i.pravatar.cc/150?img=3",
      date: "Just now",
      upvotes: 0,
      comments: 0,
      category: "other",
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    setShowNewPostModal(false);
  };
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "No date available";
    const date = timestamp.toDate();
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };
  const handleUpvote = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar className="Ttoolbar">
          <IonGrid
            className="Ttoolbar"
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <IonImg src={flag} className="flag" />
            <IonNote className="note">
              An Official Website of Cameroon Government{" "}
              <Link to={"#"}> Here's how you know</Link>{" "}
            </IonNote>
          </IonGrid>
        </IonToolbar>
        <IonToolbar>
          <Link to={"/"} slot="start">
            <IonImg
              src={logo}
              style={{ height: "50px", width: "50px", marginLeft: "30px" }}
              slot="start"
            />
          </Link>
          <IonGrid className="menu">
            {" "}
            <IonButtons
              style={{
                textTransform: "none",
                gap: "10px",
              }}
            >
              <IonButton
                routerLink="/"
                className={location.pathname === "/" ? "active-button" : ""}
              >
                Home
              </IonButton>
              <IonButton
                routerLink="/Report-status"
                className={
                  location.pathname === "/Report-status" ? "active-button" : ""
                }
              >
                Report Status
              </IonButton>
              <IonButton
                routerLink="/File-a-complaint"
                className={
                  location.pathname === "/File-a-complaint"
                    ? "active-button"
                    : ""
                }
              >
                File a Complaint
              </IonButton>
              <IonButton
                routerLink="/Forum"
                className={
                  location.pathname === "/Forum" ? "active-button" : ""
                }
              >
                Forum
              </IonButton>
              <IonButton
                routerLink="/Resources"
                className={
                  location.pathname === "/Resources" ? "active-button" : ""
                }
              >
                Resources
              </IonButton>
            </IonButtons>
            <IonButton fill="outline" routerLink="/SignIn" color={"light"}>
              Singin
            </IonButton>
          </IonGrid>{" "}
          <IonButtons slot="end" className="menubt">
            <IonMenuButton></IonMenuButton>{" "}
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonTitle> Forum</IonTitle>
          <IonButtons slot="end" className="add">
            <IonButton onClick={() => setShowNewPostModal(true)}>
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonToolbar>
          <IonSearchbar
            value={searchQuery}
            onIonChange={(e) => setSearchQuery(e.detail.value!)}
            placeholder="Search posts..."
          />
        </IonToolbar>
        <IonToolbar>
          <IonSegment
            value={selectedCategory}
            onIonChange={(e) => setSelectedCategory(e.detail.value as any)}
            scrollable
            color={"warning"}
          >
            <IonSegmentButton value="all">
              <IonLabel>All</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="scam">
              <IonLabel>Scams</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="phishing">
              <IonLabel>Phishing</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="hacking">
              <IonLabel>Hacking</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="other">
              <IonLabel>Other</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonLoading isOpen={isLoading} message="Loading forum posts..." />

        {filteredPosts.length === 0 && !isLoading ? (
          <div className="empty-state">
            <IonIcon icon={alertCircleOutline} size="large" />
            <IonText>
              <p>No posts found. Be the first to share your experience!</p>
            </IonText>
          </div>
        ) : (
          <IonGrid>
            {data.map((item) => (
              <IonList>
                {filteredPosts.map((post) => (
                  <IonItem
                    key={post.id}
                    routerLink={`/forum/post/${post.id}`}
                    detail
                  >
                    <div slot="start" className="upvote-container">
                      <IonButton
                        fill="clear"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpvote(post.id);
                        }}
                      >
                        <IonIcon icon={arrowUpOutline} />
                        {post.upvotes}
                      </IonButton>
                    </div>

                    <div className="post-content">
                      <IonLabel>
                        <h2>{item.field1}</h2>
                        <p className="post-preview">{item.field2}</p>
                      </IonLabel>

                      <div className="post-meta">
                        <IonAvatar slot="start" className="avatar">
                          <img src={post.authorAvatar} alt={post.author} />
                        </IonAvatar>
                        <IonText color="medium" className="author">
                          {post.author}
                        </IonText>
                        <IonText color="medium" className="date">
                          <IonIcon icon={timeOutline} />{" "}
                          {formatDate(item.timestamp)}
                        </IonText>
                        <IonBadge color={getCategoryColor(post.category)}>
                          {post.category}
                        </IonBadge>
                        <div className="comments">
                          <IonIcon icon={chatbubbleOutline} />
                          {post.comments}
                        </div>
                      </div>
                    </div>
                  </IonItem>
                ))}
              </IonList>
            ))}{" "}
          </IonGrid>
        )}
        <IonFab slot="fixed" horizontal="end" vertical="bottom" className="fab">
          <IonFabButton onClick={() => setShowNewPostModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>{" "}
        </IonFab>
      </IonContent>
      <IonModal
        isOpen={showNewPostModal}
        onDidDismiss={() => setShowNewPostModal(false)}
      >
        <IonHeader>
          <IonToolbar className="Mtoolbar">
            <IonButtons slot="start">
              <IonButton onClick={() => setShowNewPostModal(false)}>
                <IonIcon slot="icon-only" icon={closeOutline} />
              </IonButton>
            </IonButtons>
            <IonTitle>New Post</IonTitle>
            <IonButtons slot="end">
              <IonButton strong onClick={handleCreatePost}>
                Post
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonInput
            placeholder="Title"
            value={newPostTitle}
            onIonChange={(e) => setNewPostTitle(e.detail.value!)}
            className="post-title-input"
          />
          <IonTextarea
            placeholder="Share your experience or advice..."
            autoGrow
            value={newPostContent}
            onIonChange={(e) => setNewPostContent(e.detail.value!)}
            rows={10}
          />
          <IonText color="medium" className="post-guidelines">
            <p>
              <strong>Community Guidelines:</strong> Be respectful. Share
              factual information. Don't share personal details. Help others
              stay safe.
            </p>
          </IonText>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};
// Helper function to get category color
const getCategoryColor = (category: string): string => {
  switch (category) {
    case "scam":
      return "warning";
    case "phishing":
      return "danger";
    case "hacking":
      return "dark";
    default:
      return "medium";
  }
};

// Mock data
const mockPosts: ForumPost[] = [
  {
    id: "1",
    title: "Fake bank call scam - almost lost $5000",
    content:
      "I received a call from someone claiming to be from my bank. They said my account was compromised and asked for my details. Luckily I hung up and called my bank directly. Beware of these scams!",
    author: "Sarah J.",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
    date: "2 hours ago",
    upvotes: 24,
    comments: 8,
    category: "scam",
  },
  {
    id: "2",
    title: "How to identify phishing emails",
    content:
      "Here are some tips I learned from my IT department: 1) Check the sender email address carefully 2) Look for poor grammar 3) Never click links directly - hover to see the URL first 4) When in doubt, contact the company through their official website.",
    author: "ITSecurityPro",
    authorAvatar: "https://i.pravatar.cc/150?img=11",
    date: "1 day ago",
    upvotes: 56,
    comments: 12,
    category: "phishing",
  },
  {
    id: "3",
    title: "My social media was hacked - recovery steps",
    content:
      "Last week my Instagram was taken over. Here are the steps I took to recover it: 1) Used the official recovery process 2) Enabled 2FA 3) Changed all similar passwords 4) Checked connected apps. The whole process took 3 days but I got it back!",
    author: "Mike T.",
    authorAvatar: "https://i.pravatar.cc/150?img=7",
    date: "3 days ago",
    upvotes: 42,
    comments: 15,
    category: "hacking",
  },
  {
    id: "4",
    title: "New cryptocurrency investment scam warning",
    content:
      'There\'s a new scam promising 100% returns on crypto investments. They show fake testimonials and documents. Remember: if it sounds too good to be true, it probably is! Never send money to "investment managers" you met online.',
    author: "CryptoGuard",
    authorAvatar: "https://i.pravatar.cc/150?img=9",
    date: "5 days ago",
    upvotes: 38,
    comments: 7,
    category: "scam",
  },
];
export default Forum;
