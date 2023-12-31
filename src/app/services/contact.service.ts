import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IContact } from '../models/IContact';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private serverUrl: string = `http://localhost:8000`;

  constructor(private httpClient: HttpClient) {}
  //      GET ALL CONTACTS
  public getAllContacts(): Observable<IContact[]> {
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient
      .get<IContact[]>(dataURL)
      .pipe(catchError(this.handleError));
  }

  //      GET SINGLE CONTACT
  public getContact(contactId :string):Observable<IContact>{
    let dataURL : string = `${this.serverUrl}/contacts/${contactId}`;
    return  this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError));
  }

  //      CREATE A CONTACT
  public createContact(contact : IContact):Observable<IContact>{
    let dataURL : string=`${this.serverUrl}/contacts` ;
    return this.httpClient.post<IContact>(dataURL, contact).pipe(catchError(this.handleError));

  }

  //      UPDATE A CONTACT
  public updateContact(contact : IContact, contactId : string):Observable<IContact>{
    let dataURL : string=`${this.serverUrl}/contacts/${contactId}` ;
    return this.httpClient.put<IContact>(dataURL, contact).pipe(catchError(this.handleError));

  }

  //      DELETE A CONTACT
  public deleteContact(contactId : string):Observable<{}>{
    let dataURL : string=`${this.serverUrl}/contacts/${contactId}` ;
    return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError));

  }

  //      GET ALL GROUPS
  public getAllGroups(): Observable<IGroup[]>{
    let dataURL: string = `${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError));
  }

  //      GET SINGLE GROUP
  public getGroup(contact : IContact):Observable<IGroup>{
    let dataURL : string = `${this.serverUrl}/groups/${contact.groupId}`;
    return  this.httpClient.get<IGroup>(dataURL).pipe(catchError(this.handleError));
  }

  //      ERROR Handling

  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      //      client-side error
      errorMessage = `Error : ${error.error.message}`;
    } else {
      //       server-side error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
