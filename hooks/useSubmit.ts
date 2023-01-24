import { useContract, useSigner } from 'wagmi';
import { toWei } from 'web3-utils';
import { utils } from 'ethers';
import { balanceOf, payWithRaidToken } from '../utils/web3';
import { RAID_CONTRACT_ADDRESS, DAO_ADDRESS, SUBMISSION_REQUEST_FEE } from '../utils/config';
import useApplicationCreate from './useApplicationCreate';
import useCreateConsult from './useCreateConsult';
import {
  mapBudgetOptions,
  mapProjectType,
  mapConsultationService,
  mapAvailableProjectSpec,
  mapSkill,
  mapSkillType,
  mapAvailability,
  mapDAOFamiliarity,
  mapDeliveryPriorities,
} from '../utils/mapping';

const useSubmit = (token: string) => {
  const { data: signer, isError, isLoading } = useSigner();
  const abi = new utils.Interface(['function balanceOf(address account) view returns(uint256)']);
  const raidTokenContract = useContract({
    address: RAID_CONTRACT_ADDRESS[100],
    abi,
    singerOrProvider: signer,
  });

  const { mutateAsync } = useApplicationCreate(token);
  const { mutateAsync: mutateConsult } = useCreateConsult(token);

  const submitJoinForm = async (data: any) => {
    const applicationSkills = [
      ...data.join3.primarySkills.map((s: string) => ({ skill_key: mapSkill(s), skill_type_key: 'PRIMARY' })),
      ...data.join3.secondarySkills.map((s: string) => ({ skill_key: mapSkill(s), skill_type_key: 'SECONDARY' })),
    ];
    const submitData = {
      name: data.join1.name,
      eth_address: data.join6.ethAddress,
      introduction: data.join1.introduction,
      learning_goals: data.join1.learningGoals,
      technical_skill_type_key: mapSkillType(data.join3.technicalSkillType),
      passion: data.join4.passion,
      favorite_media: data.join4.favoriteMedia,
      crypto_thrills: data.join4.cryptoThrills,
      why_raidguild: data.join4.whyRaidguild,
      dao_familiarity_key: mapDAOFamiliarity(data.join5.daoFamiliarity),
      availability_key: mapAvailability(data.join5.cohortAvailability),
      applications_skills: {
        data: [...applicationSkills],
      },
      contact_info: {
        data: {
          discord: data.join2.discord,
          email: data.join1.email,
          github: data.join2.github,
          telegram: data.join2.telegram,
          twitter: data.join2.twitter,
        },
      },
      crypto_experience: data.join5.cryptoExperience,
      comments: data.join5.comments,
      handbook_read: data.join6.handbookRead,
      pledge_readiness: data.join6.pledgeReadiness,
    };
    const res = await mutateAsync({ ...submitData });
    return res;
  };

  const submitHireForm = async (data: any) => {
    console.log(`data from submitHireForm: ${data}`);
    let res;
    try {
      const servicesRequried = data.hire3.services
        ? [...data.hire3.services.map((s: { value: string; label: string }) => ({ guild_service_key: s.value }))]
        : [];
      const submitData = {
        // 1-Contact.tsx
        consultations_contacts: {
          data: {
            contact: {
              data: {
                name: data.hire1.name,
                eth_address: data.eth_address,
                bio: data.hire1.bio,
                contact_info: {
                  data: {
                    email: data.hire1.email,
                    discord: data.hire1.discord,
                    github: data.hire1.github,
                    twitter: data.hire1.twitter,
                    telegram: data.hire1.telegram,
                  },
                },
              },
            },
          },
        },
        // 2-ProjectOverview.tsx
        type_key: mapProjectType(data.hire2.projectType),
        specs_key: mapAvailableProjectSpec(data.hire2.specsType),
        name: data.hire2.projectName,
        description: data.hire2.projectDescription,
        // 3-Services.tsx
        consultations_services_required: {
          data: [...servicesRequried],
        },
        budget_key: mapBudgetOptions(data.hire3.budget),
        desired_delivery_date: new Date(data.hire3.desiredDeliveryDate).toISOString(),
        // desired_delivery_date: new Date().toISOString(),
        // 4-ProjectDetails.tsx
        additional_info: data.hire4.additionalInfo,
        delivery_priorities_key: mapDeliveryPriorities(data.hire4.deliveryPriorities),
        submission_type_key: 'PAID',
        consultation_hash: data.txHash,
        // submission_hash: '',
        consultation_status_key: 'PENDING',
      };
      console.log('submitData', JSON.stringify(submitData));
      const insertResponse = await mutateConsult({ ...submitData });
      console.log('insertResponse', JSON.stringify(insertResponse));

      res = {
        error: false,
        response: insertResponse,
      };
    } catch (e: any) {
      res = {
        error: true,
        message: "Couldn't submit the form, make sure you have filled all the required fields",
      };
      console.error(e.message);
    }

    return res;
  };
  const handlePayment = async (data: any): Promise<any> => {
    console.log(`data from handlePayment: ${JSON.stringify(data)}`);

    // const balance = await raidTokenContract?.balanceOf(data.eth_address);
    const tokenBalance = await balanceOf(signer, RAID_CONTRACT_ADDRESS[100], data.eth_address);
    // check raid token balance for current user
    // if balance is less than fee, return message to user
    console.log(`SUBMISSION_REQUEST_FEE ${SUBMISSION_REQUEST_FEE}`);

    if (Number(toWei(`${tokenBalance}`)) < SUBMISSION_REQUEST_FEE) {
      return {
        error: true,
        message: 'Insufficient balance',
      };
    }
    console.log(`toWei(SUBMISSION_REQUEST_FEE.toString()) ${toWei(`${SUBMISSION_REQUEST_FEE}`)}`);

    // if balance is greater than fee, transfer to DAO contract and return transaction hash
    try {
      const tx = await payWithRaidToken(
        RAID_CONTRACT_ADDRESS[100],
        signer,
        DAO_ADDRESS[100],
        toWei(`${SUBMISSION_REQUEST_FEE}`),
      );
      const { status } = await tx.wait();
      console.log(`status ${JSON.stringify(status)}`);

      if (status !== 1) {
        return {
          error: true,
          message: 'There was a transaction failure, please try again',
        };
      }
      return {
        error: false,
        message: 'Transaction successful',
        txHash: tx.hash,
      };
    } catch (e) {
      return {
        error: true,
        message: 'There was a transaction failure, please try again',
      };
    }
  };
  return {
    submitJoinForm,
    submitHireForm,
    handlePayment,
  };
};

export default useSubmit;
