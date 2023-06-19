import { useSelector, useDispatch } from 'react-redux';
import * as contactsAPI from 'redux/contactOperations';
import {
  useGetAllContactsQuery,
  useDeleteContactByIdMutation,
} from 'redux/contactsApi';
import { selectFilter } from 'redux/selectors';



import {
  selectAuth,
} from 'redux/selectors';

import {
  ListWrapper,
  PrivateContact,
  SharedContact,
} from './ContactsList.styled';
import { Button } from '../common.styled';


const ContactsList = () => {
  const { isLoggedIn } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const { data: visibleContacts } = useGetAllContactsQuery(
    undefined,
    {
      selectFromResult: ({ data, isFetching }) => ({
        data: data?.filter(
          contact =>
            contact.name.toLowerCase().includes(filter.trim().toLowerCase()) &&
            (!contact.isPrivate || isLoggedIn)
        ) ?? [],
        isFetching,
      }),
    }
  );

  const mutation = useDeleteContactByIdMutation();
  console.log(mutation);


  return visibleContacts.length === 0 ? (
    <p>Nothing to show</p>
  ) : (
    <ListWrapper>
      {visibleContacts.map(({ id, name, phone, isPrivate }) => {
        return (
          <li key={id}>
            {name}: {phone}
            {isLoggedIn &&
              (isPrivate ? (
                <PrivateContact>private</PrivateContact>
              ) : (
                <SharedContact>shared</SharedContact>
              ))}
            {isLoggedIn && (
              <Button
                type="button"
                onClick={
                  () => mutation(id)
                  // dispatch(contactsAPI.deleteContactById(id))
                }
              >
                Delete
              </Button>
            )}
          </li>
        );
      })}
    </ListWrapper>
  );
};

export default ContactsList;
