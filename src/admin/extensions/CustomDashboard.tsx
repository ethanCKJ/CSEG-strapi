import React from 'react'
import {Box, Typography, DesignSystemProvider, darkTheme, Flex, Accordion, Link, Grid} from "@strapi/design-system";
import {Page, useFetchClient} from "@strapi/strapi/admin";


type Role = {
  code: string
}
type UserData = {
  firstname: string,
  email: string,
  roleCodes: string[],
  roleNames: string[],
  isSuperAdmin: boolean,
}
// interface CustomCardProps {
//   value: number,
//   text: string,
// }
// const CustomCard = ({value, text}: CustomCardProps) => {
//   return (
//       <Grid.Item m={4} borderColor={"alternative200"} background={"neutral0"} display={"flex"} direction={"column"} padding={4}>
//           <Box><Typography variant={"alpha"}>{value}</Typography></Box>
//           <Typography>{text}</Typography>
//   </Grid.Item>)
// }

export function CustomDashboard() {
  const {get} = useFetchClient();
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setIsError(false);
      try {
        const res = await get('/admin/users/me')
        const data = res.data.data;
        const roleNames = []
        let isSuperAdmin = false;
        console.log(data);
        for (const role of data.roles){
          if (role.code === 'strapi-super-admin'){
            isSuperAdmin = true;
          }
          roleNames.push(role.name);
        }
        if ('data' in res){
          setUserData({...res.data.data, isSuperAdmin, roleNames});
        }
        else {
          setIsError(true);
        }
      } catch (e) {
        console.error(e);
        setIsError(true);
      } finally {
        setLoading(false);
        setIsError(false);
      }
    }
    fetchData();
  }, [get])


  if (loading) {
    return <Page.Loading/>
  }

  if (isError) {
    return <Box>Error loading user data</Box>
  }


  return (
      <DesignSystemProvider theme={darkTheme}>
        <Box padding={4}>
          <Flex direction={"column"} alignItems={"flex-start"} paddingBottom={4}>
            <Typography variant={"alpha"}>{`Welcome ${userData?.firstname ?? 'User'}`}</Typography>
            <Typography variant={"omega"}>{`${userData?.email ?? ''}`}</Typography>
          </Flex>
          {/*<Grid.Root padding={4} gap={4}>*/}
          {/*  <CustomCard value={1} text={"foobar"}/>*/}
          {/*</Grid.Root>*/}
          {userData?.isSuperAdmin &&
                <Box padding={4} borderColor={"warning500"}>
                    <Link href="/admin/content-manager/" paddingBottom={2} target={"_blank"}>
                      Content manager
                    </Link>
                    <Typography display="block">
                      Use this link if
                      <ol>
                        <li>1. The custom content manager does not work and you need an override.</li>
                        <li>2. You need to modify the topics assigned to events/publications/research projects </li>
                        <li>3. You need to static webpage content e.g. homepage picture</li>
                      </ol>
                    </Typography>
                </Box>}


        </Box>
      </DesignSystemProvider>
  )
}

