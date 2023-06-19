import { useSelector } from 'react-redux';
import {
  useGetAllContactsQuery,
  useDeleteContactByIdMutation,
} from 'redux/contactsApi';
import { selectFilter } from 'redux/selectors';
import { selectAuth } from 'redux/selectors';

import {
  ListWrapper,
  PrivateContact,
  SharedContact,
} from './ContactsList.styled';
import { Button } from '../common.styled';

const ContactsList = () => {
  const { isLoggedIn } = useSelector(selectAuth);
  const filter = useSelector(selectFilter);

  const { data: visibleContacts } = useGetAllContactsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data:
        data?.filter(
          contact =>
            contact.name.toLowerCase().includes(filter.trim().toLowerCase()) &&
            (!contact.isPrivate || isLoggedIn)
        ) ?? [],
    }),
  });

  const [deleteContact] = useDeleteContactByIdMutation();

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
                  () => deleteContact(id)
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
