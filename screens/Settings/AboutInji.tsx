import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  Linking,
  Pressable,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import {Modal} from '../../components/ui/Modal';
import {Column, Row, Text} from '../../components/ui';
import {Theme} from '../../components/ui/styleUtils';
import {Icon, ListItem} from 'react-native-elements';
import getAllConfigurations from '../../shared/commonprops/commonProps';
import {CopyButton} from '../../components/CopyButton';
import testIDProps from '../../shared/commonUtil';
import {__InjiVersion, __TuvaliVersion} from '../../shared/GlobalVariables';

export const AboutInji: React.FC<AboutInjiProps> = ({appId}) => {
  const {t} = useTranslation('AboutInji');

  const [showAboutInji, setShowAboutInji] = useState(false);
  const [aboutInjiUrl, setAboutInjiUrl] = useState('');

  useEffect(() => {
    getAllConfigurations().then(response => {
      setAboutInjiUrl(response.aboutInjiUrl);
    });
  }, []);

  return (
    <React.Fragment>
      <Pressable
        onPress={() => {
          setShowAboutInji(!showAboutInji);
        }}>
        <ListItem testID="aboutInji" topDivider bottomDivider>
          <Icon
            type={'feather'}
            name={'file'}
            color={Theme.Colors.Icon}
            size={25}
          />
          <ListItem.Content>
            <ListItem.Title
              {...testIDProps('aboutInji')}
              style={{paddingTop: 3}}>
              <Text weight="semibold" color={Theme.Colors.settingsLabel}>
                {t('aboutInji')}
              </Text>
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </Pressable>
      <Modal
        testID="aboutInji"
        isVisible={showAboutInji}
        headerTitle={t('header')}
        headerElevation={2}
        arrowLeft={<Icon {...testIDProps('closeAboutInji')} name={''} />}
        onDismiss={() => {
          setShowAboutInji(!showAboutInji);
        }}>
        <Row testID="appID" style={Theme.Styles.primaryRow}>
          <Row>
            <Text
              weight="semibold"
              style={{
                maxWidth: 110,
                paddingTop: 3,
              }}>
              {t('appID')}
            </Text>
            <Text weight="semibold">
              {I18nManager.isRTL ? appId : ' : ' + appId}
            </Text>
          </Row>
          <CopyButton content={appId} />
        </Row>
        <Column padding="12" align="space-between">
          <Column>
            <Text
              testID="aboutDetails"
              style={{...Theme.TextStyles.aboutDetails, paddingTop: 5}}>
              {t('aboutDetails')}
            </Text>
            <Row
              align="space-between"
              crossAlign="center"
              style={{
                maxWidth: Dimensions.get('window').width * 0.94,
                minHeight: Dimensions.get('window').height * 0.1,
                marginTop: 7,
              }}>
              <Text
                style={{
                  ...Theme.TextStyles.aboutDetailes,
                  maxWidth: 150,
                  paddingTop: 10,
                }}>
                {t('forMoreDetailes')}
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  aboutInjiUrl && Linking.openURL(aboutInjiUrl);
                }}>
                <Text
                  color={Theme.Colors.AddIdBtnBg}
                  style={{maxWidth: 150, paddingTop: 3}}
                  weight="bold">
                  {t('clickHere')}
                </Text>
              </TouchableOpacity>
            </Row>
          </Column>

          <Column
            pY={25}
            align="space-between"
            crossAlign="center"
            style={Theme.Styles.versionContainer}>
            <Row>
              <Text
                weight="semibold"
                style={{paddingTop: 3}}
                color={Theme.Colors.aboutVersion}>
                {t('version') + ' : '}
              </Text>
              <Text
                weight="semibold"
                style={{paddingTop: 3, maxWidth: 250}}
                color={Theme.Colors.aboutVersion}>
                {__InjiVersion.getValue()}
              </Text>
            </Row>

            {__TuvaliVersion.getpackageVersion() != 'unknown' && (
              <Text
                weight="semibold"
                style={{paddingTop: 3, marginTop: 3}}
                color={Theme.Colors.aboutVersion}>
                {t('tuvaliVersion')}: {__TuvaliVersion.getValue()}
              </Text>
            )}
          </Column>
        </Column>
      </Modal>
    </React.Fragment>
  );
};

interface AboutInjiProps {
  isVisible?: boolean;
  appId?: string;
}
