import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/article/article.model';
import { CreateModArticleDto } from '../models/article/crate-mod-article.dto';
import { environment } from 'src/environments/environment';
import { stringSearch } from '../state/part/part.actions';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  
    private apiUrl = environment.api.apiUrl;

    constructor(private http: HttpClient) {

    }

    getAllArticles() {
        return this.http.get<Article[]>(`${this.apiUrl}/articles`);
    }

    getArticleById(id: string) {
        return this.http.get<Article>(`${this.apiUrl}/articles/${id}`);
    }

    addArticle(articleData: CreateModArticleDto) {
        const body = articleData;
        return this.http.post<Article>(`${this.apiUrl}/articles/addArticle`, body);
    }

    updateArticle(articleId: string, articleData: CreateModArticleDto) {
        const body = articleData;
        return this.http.put<Article>(`${this.apiUrl}/articles/changeArticle/${articleId}`, body);
    }

    deleteArticle(articleId: string) {
        return this.http.delete<any>(`${this.apiUrl}/articles/deleteArticle/${articleId}`);
    }

    stringSearch(searchString: string) {
        return this.http.get<Article[]>(`${this.apiUrl}/articles/stringSearch/${searchString}`);
    }
}
