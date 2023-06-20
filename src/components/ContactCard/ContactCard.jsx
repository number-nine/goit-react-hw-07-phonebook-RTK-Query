import { useSelector } from 'react-redux';

import { useDeleteContactByIdMutation } from 'redux/contactsApi';
import { selectAuth } from 'redux/selectors';

import { Button } from '../common.styled';
import { PrivateContact, SharedContact, ListItem } from './ContactCard.styled';

const ContactCard = ({ data }) => {
  const { id, name, phone, isPrivate } = data;
  const [deleteContact, { isLoading }] = useDeleteContactByIdMutation();
  const { isLoggedIn } = useSelector(selectAuth);
  return (
    <ListItem>
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
          onClick={() => deleteContact(id)}
          disabled={isLoading}
        >
          Delete
        </Button>
      )}
    </ListItem>
  );
};

export default ContactCard;
