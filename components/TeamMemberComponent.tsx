import { Box, Avatar, Typography } from '@mui/material';
import ExhibitEditIcon from './svg-components/ExhibitEditIcon';
import { TeamMember } from './types/teamMember';

interface TeamMemberProps {
  member: TeamMember
}

const TeamMemberComponent = ({ member }: TeamMemberProps) => (
    <Box p={2} display="flex" justifyContent="space-between" alignItems="center" borderBottom={1} borderColor="#EBEBEA">
      <Box display="flex">
        <Avatar sx={{ 'bgcolor': '#F5F6F7' }} variant="square">
          {member.name.charAt(0)}
        </Avatar>
        <Box display="flex" flexDirection="column" ml={2}>
          <Typography variant="body1" color="info">
            {member.name}
          </Typography>
          <Typography variant="body2" color="secondary">
            {member.type}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={[
          { 'cursor': 'pointer' },
          {
            '&:hover': {
              'cursor': 'pointer',
              'backgroundColor': '#EBEBEA',
              'borderRadius': '50%'
            }
          }
        ]}
      >
        <ExhibitEditIcon />
      </Box>
    </Box>
);

export default TeamMemberComponent;
