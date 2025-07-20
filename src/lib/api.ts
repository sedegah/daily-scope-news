import { toast } from "@/components/ui/use-toast";

const API_KEY = "test"; // Replace with your actual API key
const API_BASE_URL = "https://content.guardianapis.com";

export interface Article {
  id: string;
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
  sectionName: string;
  fields?: {
    headline?: string;
    trailText?: string;
    body?: string;
    byline?: string;
    thumbnail?: string;
    wordcount?: string;
  };
  tags?: Array<{
    id: string;
    type: string;
    webTitle: string;
    webUrl: string;
  }>;
}

export interface SearchResponse {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    results: Article[];
  };
}

export const fetchArticles = async (
  section?: string,
  page: number = 1,
  pageSize: number = 10,
  orderBy: string = "newest"
): Promise<SearchResponse> => {
  try {
    let url = `${API_BASE_URL}/search?api-key=${API_KEY}&page=${page}&page-size=${pageSize}&order-by=${orderBy}&show-fields=headline,trailText,thumbnail,byline,wordcount&show-tags=contributor`;

    if (section) {
      url += `&section=${section}`;
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    toast({
      title: "Error",
      description: "Failed to load articles. Please try again later.",
      variant: "destructive",
    });
    return {
      response: {
        status: "error",
        userTier: "",
        total: 0,
        startIndex: 0,
        pageSize: 0,
        currentPage: 0,
        pages: 0,
        results: [],
      },
    };
  }
};

export const fetchArticleById = async (articleId: string): Promise<Article | null> => {
  try {
    const url = `${API_BASE_URL}/${articleId}?api-key=${API_KEY}&show-fields=headline,trailText,body,byline,thumbnail,wordcount&show-tags=contributor`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response.content;
  } catch (error) {
    console.error("Error fetching article:", error);
    toast({
      title: "Error",
      description: "Failed to load article. Please try again later.",
      variant: "destructive",
    });
    return null;
  }
};

export const searchArticles = async (
  query: string, 
  page: number = 1,
  pageSize: number = 10
): Promise<SearchResponse> => {
  try {
    const url = `${API_BASE_URL}/search?api-key=${API_KEY}&q=${encodeURIComponent(query)}&page=${page}&page-size=${pageSize}&show-fields=headline,trailText,thumbnail,byline&show-tags=contributor`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to search articles: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error searching articles:", error);
    toast({
      title: "Error",
      description: "Failed to search articles. Please try again later.",
      variant: "destructive",
    });
    return {
      response: {
        status: "error",
        userTier: "",
        total: 0,
        startIndex: 0,
        pageSize: 0,
        currentPage: 0,
        pages: 0,
        results: [],
      },
    };
  }
};

// New function to fetch African news
export const fetchAfricanNews = async (
  page: number = 1,
  pageSize: number = 10,
  orderBy: string = "newest"
): Promise<SearchResponse> => {
  try {
    // Creating a query that targets African content
    const query = "africa OR african OR nigeria OR kenya OR ghana OR ethiopia OR southafrica OR egypt";
    let url = `${API_BASE_URL}/search?api-key=${API_KEY}&q=${encodeURIComponent(query)}&page=${page}&page-size=${pageSize}&order-by=${orderBy}&show-fields=headline,trailText,thumbnail,byline,wordcount&show-tags=contributor`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch African news: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching African news:", error);
    toast({
      title: "Error",
      description: "Failed to load African news. Please try again later.",
      variant: "destructive",
    });
    return {
      response: {
        status: "error",
        userTier: "",
        total: 0,
        startIndex: 0,
        pageSize: 0,
        currentPage: 0,
        pages: 0,
        results: [],
      },
    };
  }
};
