import { useSelector } from 'react-redux';
import { useGetAllContactsQuery } from 'redux/contactsApi';
import { selectFilter } from 'redux/selectors';
import { selectAuth } from 'redux/selectors';

import { ListWrapper } from './ContactsList.styled';
import ContactCard from 'components/ContactCard';

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
  return visibleContacts.length === 0 ? (
    <p>Nothing to show</p>
  ) : (
    <ListWrapper>
      {visibleContacts.map(contact => {
        return <ContactCard key={contact.id} data={contact} />;
      })}
    </ListWrapper>
  );
};

export default ContactsList;
